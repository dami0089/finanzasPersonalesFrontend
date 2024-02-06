import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes desde el paquete prop-types
import clienteAxios from "../configs/clienteAxios";

import Swal from "sweetalert2";

const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [actualizarDatosPerfil, setActualizarDatosPerfil] = useState(false);

  const [auth, setAuth] = useState({});
  const [modalEditarDatos, setModalEditarDatos] = useState(false);

  const handleModalEditarDatos = () => {
    setModalEditarDatos(!modalEditarDatos);
  };

  const registrarUsuario = async (nombre, apellido, email, password) => {
    const info = {
      nombre,
      apellido,
      email,
      password,
    };
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(`usuarios/registrar`, info);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  const editarUsuario = async (nombre, apellido, email, id) => {
    const info = {
      nombre,
      apellido,
      email,
    };
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `usuarios/editar-usuario/${id}`,
        info
      );

      setAuth(data);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cambios almacenados",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  const [datosUser, setDatosUser] = useState([]);

  const obtenerDatosUsuario = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `usuarios/obtener-datos-usuario/${id}`,
        {}
      );

      setDatosUser(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        registrarUsuario,
        nombre,
        setNombre,
        apellido,
        setApellido,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        auth,
        setAuth,
        modalEditarDatos,
        handleModalEditarDatos,
        idUsuario,
        setIdUsuario,
        editarUsuario,
        datosUser,
        obtenerDatosUsuario,
        actualizarDatosPerfil,
        setActualizarDatosPerfil,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

// Aquí definimos las propTypes para GastosProvider
UsuariosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UsuariosProvider };
export default UsuariosContext;
