import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import clienteAxios from "../../configs/clienteAxios";
import useUsuarios from "../../hooks/useUsuarios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useUsuarios();

  const navigate = useNavigate();

  const handleCrearCuenta = (e) => {
    e.preventDefault();
    navigate("/registro");
  };

  const handleOlvidePass = (e) => {
    e.preventDefault();
    navigate("/recordar-password");
  };

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        navigate("/inicio");
        if (data._id && location.pathname === "/") {
          navigate("/inicio");
        }
      } catch (error) {
        // setAuth({});
      }
    };
    autenticarUsuario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios!",
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAuth(data);
      localStorage.setItem("token", data.token);

      navigate("/inicio");
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
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Contraseña"
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
                Iniciar sesión
              </button>
            </div>
          </form>
          <div className="flex justify-between text-gray-600">
            <p
              className="hover:cursor-pointer"
              onClick={(e) => handleOlvidePass(e)}
            >
              Olvidaste tu password?
            </p>
            <p
              className="hover:cursor-pointer"
              onClick={(e) => handleCrearCuenta(e)}
            >
              Crear Cuenta
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
