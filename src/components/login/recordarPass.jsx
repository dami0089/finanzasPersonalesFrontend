import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import clienteAxios from "../../configs/clienteAxios";
import Swal from "sweetalert2";

const RecordarPass = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implementa tu lógica de autenticación aquí
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleCrear = (e) => {
    e.preventDefault();
    navigate("/registro");
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={true} />

      <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('/public/vista-frontal-articulos-oficina-tabla-crecimiento-hucha.jpg')]">
        <div className="max-w-md w-full space-y-8 p-10 bg-white bg-opacity-90 rounded-lg shadow-md">
          <h1 className="text-center uppercase text-xl font-bold text-gray-600">
            Recordar Password
          </h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Email
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Recordar Contraseña
              </button>
            </div>
          </form>
          <div className="flex justify-between text-gray-600">
            <p className="hover:cursor-pointer" onClick={(e) => handleLogin(e)}>
              Login
            </p>
            <p className="hover:cursor-pointer" onClick={(e) => handleCrear(e)}>
              Crear Cuenta
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordarPass;
