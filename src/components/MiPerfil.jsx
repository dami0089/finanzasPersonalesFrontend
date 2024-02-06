import { useEffect } from "react";
import useUsuarios from "../hooks/useUsuarios";

const MiPerfil = () => {
  const {
    handleModalEditarDatos,

    obtenerDatosUsuario,

    setNombre,
    setApellido,
    datosUser,
    setEmail,
    actualizarDatosPerfil,
    setActualizarDatosPerfil,
    idUsuario,
  } = useUsuarios();

  useEffect(() => {
    const obtenerData = async () => {
      await obtenerDatosUsuario(idUsuario);
      setNombre(datosUser.nombre);
      setApellido(datosUser.apellido);
      setEmail(datosUser.email);
    };
    obtenerData();
  }, []);

  useEffect(() => {
    const obtenerData = async () => {
      if (actualizarDatosPerfil) {
        await obtenerDatosUsuario(idUsuario);
        setNombre(datosUser.nombre);
        setApellido(datosUser.apellido);
        setEmail(datosUser.email);
        setActualizarDatosPerfil(false);
      }
    };
    obtenerData();
  }, [actualizarDatosPerfil]);

  const handleEditar = (e) => {
    e.preventDefault();
    handleModalEditarDatos();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Mi Perfil</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => handleEditar(e)}
        >
          Editar Perfil
        </button>
      </div>
      <div className="space-y-2">
        <p>
          <strong>Nombre:</strong> {datosUser.nombre}
        </p>
        <p>
          <strong>Apellido:</strong> {datosUser.apellido}
        </p>
        <p>
          <strong>Email:</strong> {datosUser.email}
        </p>
      </div>
      {/* Aquí podrías añadir un botón para editar los datos del perfil */}
    </div>
  );
};

export default MiPerfil;
