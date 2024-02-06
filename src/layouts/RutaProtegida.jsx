import { Navigate, Outlet } from "react-router-dom";
import useUsuarios from "../hooks/useUsuarios";

const RutaProtegida = () => {
  const { auth } = useUsuarios();

  return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RutaProtegida;
