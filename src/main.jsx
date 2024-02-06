import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { GastosProvider } from "./context/GastosProvider.jsx";
import { UsuariosProvider } from "./context/UsuariosProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsuariosProvider>
      <GastosProvider>
        <App />
      </GastosProvider>
    </UsuariosProvider>
  </React.StrictMode>
);
