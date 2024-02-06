import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import clienteAxios from "../../configs/clienteAxios";

const NuevaContra = () => {
  const [pass1, setPass1] = useState("");
  const [password, setPassword] = useState("");
  const params = useParams();
  const { token } = params;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass1 !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        `/usuarios/nueva-pass/${token}`,
        {
          password,
        }
      );
      Swal.fire({
        title: data.msg,
        text: "Seras redirigido al login!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={true} />
      <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('/public/vista-frontal-articulos-oficina-tabla-crecimiento-hucha.jpg')]">
        <div className="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h1 className="text-center uppercase text-xl font-bold text-gray-600">
            Ingresar
          </h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Usuario
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                  placeholder="Ingresa la nueva contraseña"
                  value={pass1}
                  onChange={(e) => setPass1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Repite la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar Nueva Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevaContra;
