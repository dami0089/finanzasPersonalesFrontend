import { useEffect } from "react";
import clienteAxios from "../../configs/clienteAxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const NuevaPass = () => {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios.post(
          `/usuarios/confirmar/${token}`
        );
        console.log(data);

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
    comprobarToken();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('/public/vista-frontal-articulos-oficina-tabla-crecimiento-hucha.jpg')]"></div>
  );
};

export default NuevaPass;
