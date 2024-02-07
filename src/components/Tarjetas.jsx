import { useEffect, useState } from "react";
import useGastos from "../hooks/useGastos";
import formatearFecha from "../helpers/formatearFecha";
import Swal from "sweetalert2";
import useUsuarios from "../hooks/useUsuarios";
import {
  ArrowsRightLeftIcon,
  PlusIcon,
} from "../../node_modules/@heroicons/react/16/solid/esm/index";
import ModalNuevaTarjeta from "./ModalNuevaTarjeta";

export const Tarjetas = () => {
  const {
    gastos,
    obtenerGastos,
    actualizarListadoMovimientos,
    setActualizarListadoMovimientos,
    handleModalEditarGasto,
    setFechaGasto,
    setConceptoGasto,
    setDescripcionGasto,
    setCategoriaGasto,
    setImporteGasto,
    setIdGastoEditar,
    eliminarGasto,
    modalNuevaTarjeta,
    handleModalNuevaTarjeta,
  } = useGastos();

  const { auth } = useUsuarios();
  useEffect(() => {
    const mostrarTransacciones = async () => {
      await obtenerGastos(auth._id);
    };
    mostrarTransacciones();
  }, []);

  useEffect(() => {
    const mostrarTransacciones = async () => {
      if (actualizarListadoMovimientos) {
        await obtenerGastos(auth._id);
        setActualizarListadoMovimientos(false);
      }
    };
    mostrarTransacciones();
  }, [actualizarListadoMovimientos]);

  // Simulamos 20 transacciones hardcodeadas

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

  // Calculamos las transacciones para la página actual
  const currentTransactions = gastos.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  // Cambiar de página
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el total de páginas
  const pageCount = Math.ceil(gastos.length / recordsPerPage);

  const handleEditarGasto = (
    e,
    fecha,
    concepto,
    descripcion,
    categoria,
    importe,
    id
  ) => {
    e.preventDefault();
    setFechaGasto(fecha),
      setConceptoGasto(concepto),
      setDescripcionGasto(descripcion),
      setCategoriaGasto(categoria),
      setImporteGasto(importe),
      setIdGastoEditar(id),
      handleModalEditarGasto();
  };

  const handleEliminargasto = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres eliminar el movimiento?",
      text: "Esta accion es irrecuperable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarGasto(id);
        setActualizarListadoMovimientos(true);
      }
    });
  };

  const handleNueva = (e) => {
    e.preventDefault();
    handleModalNuevaTarjeta();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-center mb-4">
          Tarjetas de Credito
        </h2>

        <div className="hidden md:flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline mr-2 inline-flex items-center"
            onClick={(e) => handleNueva(e)}
          >
            <PlusIcon className="w-5 h-5 " />
          </button>
        </div>
      </div>

      <ArrowsRightLeftIcon className="h-8 w-8 text-green-400 mt-8" />

      {gastos.length > 0 ? (
        <>
          <div className="overflow-x-auto mt-10">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Concepto
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Importe ($)
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      <div className="flex items-center justify-center gap-4">
                        {formatearFecha(transaction.fecha)}
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm uppercase font-bold">
                      <div className="flex items-center justify-center gap-4">
                        {transaction.concepto}
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      <div className="flex items-center justify-center gap-4">
                        {transaction.descripcion}
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      <div className="flex items-center justify-center gap-4">
                        {transaction.nombreCategoria}
                      </div>
                    </td>
                    <td
                      className={`px-5 py-3 border-b border-gray-200 text-sm ${
                        transaction.concepto === "ingreso"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-4">
                        {transaction.concepto === "ingreso"
                          ? `$ ${transaction.importe}`
                          : `-$ ${Math.abs(transaction.importe)}`}
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      <div className="flex items-center justify-center gap-4">
                        <div
                          className="hover:cursor-pointer"
                          onClick={(e) =>
                            handleEditarGasto(
                              e,
                              transaction.fecha,
                              transaction.concepto,
                              transaction.descripcion,
                              transaction.categoria,
                              transaction.importe,
                              transaction._id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                            />
                          </svg>
                        </div>
                        <div
                          className="hover:cursor-pointer"
                          onClick={(e) =>
                            handleEliminargasto(e, transaction._id)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                            />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center italic text-gray-400">
          Aun no tienes tarjetas de credito, agrega una
        </p>
      )}
      {modalNuevaTarjeta ? <ModalNuevaTarjeta /> : ""}
    </div>
  );
};
