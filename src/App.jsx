import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Configuracion from "./components/Configuracion";
import { Dashboard } from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/login";
import Register from "./components/login/register";
import RecordarPass from "./components/login/recordarPass";
import NuevaPass from "./components/login/nuevaPass";
import RutaProtegida from "./layouts/RutaProtegida";
import NuevaContra from "./components/login/NuevaContra";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recordar-password" element={<RecordarPass />} />
        <Route path="/nueva-password/:token" element={<NuevaPass />} />
        <Route path="/olvide-password/:token" element={<NuevaContra />} />
        <Route path="/inicio" element={<RutaProtegida />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/configuracion" element={<RutaProtegida />}>
          <Route index element={<Configuracion />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
        {/* Redirige todas las rutas no encontradas a '/' */}
      </Routes>
    </Router>
  );
}

export default App;
