import { useState } from "react";
import MiPerfil from "./MiPerfil";
import Categorias from "./Categorias";
import useGastos from "../hooks/useGastos";
import ModalNuevaCategoria from "./ModalNuevaCategoria";
import { ToastContainer } from "react-toastify";
import ModalEditarCategoria from "./ModalEditarCategoria";
import Swal from "sweetalert2";
import useUsuarios from "../hooks/useUsuarios";
import { useNavigate } from "react-router-dom";
import ModalEditarUsuario from "./ModalEditarUsuario";

const Configuracion = () => {
  const [seccionActiva, setSeccionActiva] = useState("miPerfil");

  const { modalCategoria, modalEditarCategoria } = useGastos();
  const { modalEditarDatos } = useUsuarios();
  const { setAuth } = useUsuarios();
  const navigate = useNavigate();

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "miPerfil":
        return <MiPerfil />;
      case "categorias":
        return <Categorias />;
      default:
        return <MiPerfil />;
    }
  };

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres cerrar Sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setAuth({});
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 h-full">
        <ToastContainer pauseOnFocusLoss={true} />
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg mx-4 md:mx-0">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-blue-50 p-5 border-r border-gray-200">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer p-2 hover:bg-blue-600 hover:text-white rounded ${
                  seccionActiva === "miPerfil"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setSeccionActiva("miPerfil")}
              >
                Mi Perfil
              </li>
              <li
                className={`cursor-pointer p-2 hover:bg-blue-600 hover:text-white rounded ${
                  seccionActiva === "categorias"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => setSeccionActiva("categorias")}
              >
                Categorías
              </li>
              <li
                className="cursor-pointer p-2 hover:bg-red-600 hover:text-white rounded text-gray-700"
                onClick={(e) => handleCerrarSesion(e)}
              >
                Cerrar sesión
              </li>
            </ul>
          </div>
          {/* Contenido Principal */}

          <div className="w-full md:w-3/4 p-5">{renderSeccion()}</div>
        </div>

        {modalCategoria ? <ModalNuevaCategoria /> : null}
        {modalEditarCategoria ? <ModalEditarCategoria /> : null}
        {modalEditarDatos ? <ModalEditarUsuario /> : null}
      </div>
    </>
  );
};

export default Configuracion;
