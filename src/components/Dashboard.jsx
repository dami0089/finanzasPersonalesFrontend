import { OverviewCard } from "./OverviewCard";
import { RecentTransactions } from "./RecentTransactions";
import { MonthlyExpensesChart } from "./MonthlyExpensesChart";
import { CategoryExpensesChart } from "./CategoryExpensesChart";
import {
  CogIcon,
  PlusIcon,
} from "../../node_modules/@heroicons/react/16/solid/esm/index";
import useGastos from "../hooks/useGastos";
import ModalNuevoGasto from "./ModalNuevoGasto";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ModalEditarGasto from "./ModalEditarGasto";
import { useEffect } from "react";
import useUsuarios from "../hooks/useUsuarios";

export const Dashboard = () => {
  const {
    modalGasto,
    handleModalGasto,
    modalEditarGasto,
    dash,
    obtenerDash,
    actualizarListadoMovimientos,
    setActualizarListadoMovimientos,
  } = useGastos();

  const { auth, setIdUsuario } = useUsuarios();

  useEffect(() => {
    const datos = async () => {
      await obtenerDash(auth._id);
      setIdUsuario(auth._id);
    };
    datos();
  }, []);

  useEffect(() => {
    const datos = async () => {
      if (actualizarListadoMovimientos) {
        await obtenerDash(auth._id);
        setActualizarListadoMovimientos(false);
      }
    };
    datos();
  }, [actualizarListadoMovimientos]);

  const navigate = useNavigate();

  const handleGasto = (e) => {
    e.preventDefault();
    handleModalGasto();
  };

  const handleNavegarConfig = (e) => {
    e.preventDefault();
    navigate("/configuracion");
  };

  return (
    <>
      <ToastContainer pauseOnFocusLoss={true} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botones de Acción */}
        <div className="flex justify-between items-center mt-10 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Finanzas Personales
            </h1>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline mr-2 inline-flex items-center"
              onClick={(e) => handleGasto(e)}
            >
              <PlusIcon className="w-5 h-5 " />
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline inline-flex items-center"
              onClick={(e) => handleNavegarConfig(e)}
            >
              <CogIcon className="w-5 h-5 " />
            </button>
          </div>
        </div>
        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-10">
          <OverviewCard
            title="Ingresos"
            value={`${dash.ingresos ? dash.ingresos : "Cargando..."}`}
            icon="🏦"
          />
          <OverviewCard
            title="Gastos"
            value={`${dash.gastos ? dash.gastos : "Cargando..."}`}
            icon="🛍️"
          />
          <OverviewCard
            title="Saldo"
            value={`${dash.saldo ? dash.saldo : "Cargando..."}`}
            icon="💰"
          />
        </div>
        {/* Gráficos */}
        <div className="flex flex-wrap -mx-3 mb-8">
          <div className="w-full lg:w-1/2 px-3 mb-6">
            <div
              className="bg-white shadow-md rounded-lg p-14"
              style={{ height: "24rem" }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Gastos por Mes ultimos 12 meses
              </h2>
              <MonthlyExpensesChart />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-3">
            <div
              className="bg-white shadow-md rounded-lg p-14"
              style={{ height: "24rem" }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Gastos por mes por Categoría
              </h2>
              <CategoryExpensesChart />
            </div>
          </div>
        </div>
        {/* Transacciones Recientes */}
        <div className="my-8">
          <RecentTransactions />
        </div>
        {modalGasto ? <ModalNuevoGasto /> : null}
        {modalEditarGasto ? <ModalEditarGasto /> : null}
      </div>
    </>
  );
};
