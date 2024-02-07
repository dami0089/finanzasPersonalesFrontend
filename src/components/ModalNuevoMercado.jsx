import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { toast } from "react-toastify";
import useGastos from "../hooks/useGastos";
import useUsuarios from "../hooks/useUsuarios";
import Swal from "sweetalert2";

const ModalNuevoMercado = () => {
  const {
    setActualizarListadoMovimientos,
    fechaGasto,
    setFechaGasto,

    importeGasto,
    setImporteGasto,

    handleModalMercado,
    modalMercado,
    handleModalSuperMercado,
    supermercados,
    obtenerSupermercados,
    actualizarListadoCategorias,
    setActualizarListadoCategorias,
    productosMercado,
    obtenerProductosMercado,
    setIdProductoFiltrado,
    handleModalNuevoProductoMercado,
    registrarProductos,
    setRegistrarProductos,
    productosSeleccionados,
    setProductosSeleccionados,
    handleModalImporteProducto,

    setNombreProd,

    setIdProducto,
    idSuperMercado,
    setIdSuperMercado,
    nuevoGastoSupermercado,
  } = useGastos();

  const { auth } = useUsuarios();

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");

  const agregarProductoASeleccionados = (producto) => {
    // Verificar si el producto ya está en la lista para evitar duplicados
    const yaEstaSeleccionado = productosSeleccionados.some(
      (p) => p._id === producto._id
    );
    if (!yaEstaSeleccionado) {
      setProductosSeleccionados((prevProductos) => [
        ...prevProductos,
        { ...producto, importe: "0" }, // Añade el producto con importe inicial de cero
      ]);
    } else {
      toast.error("El producto ya esta en tu lista", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    // Limpiar el input y cerrar la lista de sugerencias
    setNombreProducto("");
    setProductosFiltrados([]);
  };

  const fecha = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  useEffect(() => {
    const obtenerCat = async () => {
      await obtenerSupermercados(auth._id);
      await obtenerProductosMercado(auth._id);
      setFechaGasto(fecha);
    };
    obtenerCat();
  }, []);

  useEffect(() => {
    const obtenerCat = async () => {
      if (actualizarListadoCategorias) {
        await obtenerSupermercados(auth._id);
        setActualizarListadoCategorias(false);
      }
    };
    obtenerCat();
  }, [actualizarListadoCategorias]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if ([fechaGasto, importeGasto].includes("")) {
      toast.error("La fecha y el importe son obligatorios", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Convertir importeGasto a float y sumar todos los importes de los productos seleccionados
    const totalProductos = productosSeleccionados.reduce((acc, producto) => {
      // Asegurarse de que producto.importe sea tratado como una cadena
      const importeString = String(producto.importe).replace(",", ".");
      const importe = parseFloat(importeString);
      const cantidad = parseInt(producto.cantidad, 10);
      return acc + importe * cantidad;
    }, 0);

    const importeGastoFloat = parseFloat(
      String(importeGasto).replace(",", ".")
    );

    // Comparar el total de los productos con el importeGasto
    if (Math.abs(totalProductos - importeGastoFloat) > 0.01) {
      // Permitir una pequeña diferencia por cuestiones de redondeo
      toast.error("La suma de los productos no coincide con el importe total", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Preparar los IDs de los productos seleccionados

    // Llamar a nuevoGastoSupermercado del contexto
    await nuevoGastoSupermercado({
      fecha: fechaGasto,
      supermercado: idSuperMercado,
      importe: importeGasto,
      productos: productosSeleccionados,
      usuario: auth._id,
    });
    setActualizarListadoMovimientos(true);
    setFechaGasto("");
    setIdSuperMercado("");
    setImporteGasto("");
    setProductosSeleccionados([]);
    handleModalMercado();
  };

  const handleSuper = (e) => {
    e.preventDefault();
    handleModalSuperMercado();
  };

  const handleNuevoProducto = (e) => {
    e.preventDefault();
    handleModalMercado();
    handleModalNuevoProductoMercado();
  };

  const handleNombreProductoChange = (e) => {
    const inputValue = e.target.value;
    setNombreProducto(inputValue);

    // Filtrar los clientes basados en el nombre ingresado
    const coincidencias = productosMercado.filter((producto) =>
      producto.nombreSubCategoria
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );

    setProductosFiltrados(coincidencias);
  };

  const cargarImporte = (e, id, nombreSubCategoria) => {
    e.preventDefault();
    setIdProducto(id);
    setNombreProd(nombreSubCategoria);

    handleModalImporteProducto();
  };

  const handleEliminarProducto = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres eliminar el producto?",
      text: "Esta accion es irrecuperable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const productosActualizados = productosSeleccionados.filter(
          (producto) => producto._id !== id
        );

        // Actualizar el estado con el nuevo arreglo de productos
        setProductosSeleccionados(productosActualizados);

        // Opcional: Mostrar un mensaje de confirmación
        toast.success("Producto eliminado correctamente", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };

  return (
    <Transition.Root show={modalMercado} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleModalMercado}
      >
        <div className="flex min-h-screen  items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 sm:align-middle">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={handleModalMercado}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="absolute right-8 top-0 hidden pr-4 pt-4 sm:block"></div>
                <div className="mt-3 w-full text-center sm:ml-0 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900 text-center uppercase"
                  >
                    Nueva compra en supermercado
                  </Dialog.Title>

                  <form
                    className="mx-2 my-2"
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <>
                      <div className="flex items-center space-x-3 mb-1">
                        {/* Campo de Fecha */}
                        <div className="flex-1 min-w-0">
                          <label
                            className="text-sm font-bold uppercase text-gray-700 block"
                            htmlFor="fec"
                          >
                            Fecha
                          </label>
                          <input
                            id="fec"
                            type="date"
                            placeholder="Fecha"
                            className="mt-1 w-full rounded-md border-2 p-2 placeholder-gray-400 text-sm"
                            value={fechaGasto}
                            onChange={(e) => setFechaGasto(e.target.value)}
                          />
                        </div>

                        {/* Select de Nombre del Supermercado */}
                        <div className="flex-1 min-w-0">
                          <label
                            className="text-sm font-bold uppercase text-gray-700 block"
                            htmlFor="tipo"
                          >
                            Nombre Supermercado
                          </label>
                          <select
                            id="tipo"
                            className="mt-1 w-full rounded-md border-2 p-2 placeholder-gray-400 text-sm"
                            value={idSuperMercado}
                            onChange={(e) => {
                              setIdSuperMercado(e.target.value);
                            }}
                          >
                            <option value="">--Seleccionar--</option>
                            {supermercados.map((superM) => (
                              <option key={superM._id} value={superM._id}>
                                {superM.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Botón + */}
                        <div>
                          <button
                            type="button"
                            className="mt-7 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-8 w-8 items-center"
                            title="Agrega un nuevo mercado"
                            onClick={(e) => handleSuper(e)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-end space-x-3 mb-1">
                        {/* Campo de Fecha */}
                        <div className="flex-1 min-w-0">
                          <label
                            className="text-sm font-bold uppercase text-gray-700 block"
                            htmlFor="fec"
                          >
                            Cuanto Gastaste?
                          </label>
                          <input
                            id="fec"
                            type="text"
                            placeholder="Importe"
                            className="mt-1 w-full rounded-md border-2 p-2 placeholder-gray-400 text-sm"
                            value={importeGasto}
                            onChange={(e) => setImporteGasto(e.target.value)}
                          />
                        </div>

                        {/* Select de Nombre del Supermercado */}
                        <div className="flex-1 min-w-0">
                          <label
                            className="text-sm font-bold uppercase text-gray-700 block text-center"
                            htmlFor="tipo"
                          >
                            Queres registrar todos los productos?
                          </label>
                          <select
                            id="tipo"
                            className="mt-1 w-full rounded-md border-2 p-2 placeholder-gray-400 text-sm"
                            value={registrarProductos}
                            onChange={(e) => {
                              setRegistrarProductos(e.target.value);
                            }}
                          >
                            <option value="">--Seleccionar--</option>

                            <option key={1} value={"si"}>
                              Si
                            </option>

                            <option key={4} value={"no"}>
                              No
                            </option>
                          </select>
                        </div>
                      </div>

                      {registrarProductos === "si" ? (
                        <>
                          {/* Productos filtrados */}

                          <div className="flex items-center space-x-3 mb-1">
                            <div className="mb-1">
                              <label
                                className="text-sm font-bold uppercase text-gray-700"
                                htmlFor="cliente"
                              >
                                Agrega Productos
                              </label>

                              <input
                                id="cliente"
                                className="mt-2 w-full rounded-md border-2 p-2 placeholder-gray-400"
                                type="text"
                                autoComplete="off"
                                placeholder="Ingresa nombre del producto"
                                value={nombreProducto}
                                onChange={handleNombreProductoChange}
                              />

                              {/* Mostrar las coincidencias */}
                              {productosFiltrados.length > 0 && (
                                <div className="mt-2 max-h-40 overflow-y-auto rounded-md bg-gray-100">
                                  <ul className="border border-gray-300 py-1 px-2">
                                    {productosFiltrados.map((producto) => (
                                      <li
                                        key={producto._id}
                                        className="cursor-pointer py-1 hover:bg-gray-200"
                                        onClick={() => {
                                          setNombreProducto(
                                            producto.nombreSubCategoria
                                          );
                                          setIdProductoFiltrado(producto._id);
                                          setProductosFiltrados([]);
                                          agregarProductoASeleccionados(
                                            producto
                                          );
                                        }}
                                      >
                                        {producto.nombreSubCategoria}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            <div>
                              <button
                                type="button"
                                className="mt-7 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-8 w-8 items-center"
                                title="Agrega un nuevo producto"
                                onClick={(e) => handleNuevoProducto(e)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {productosSeleccionados.length > 0 && (
                            <div className="mt-4">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Nombre del Producto
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Cantidad
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Importe Unitario
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Total
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                      Accion
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {productosSeleccionados.map((producto) => (
                                    <tr key={producto._id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {producto.nombreSubCategoria}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {producto.cantidad}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $ {producto.unitario}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        $ {producto.importe}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center justify-center gap-4 ">
                                          <div
                                            className="hover:cursor-pointer"
                                            title="Completar Importe"
                                            onClick={(e) =>
                                              cargarImporte(
                                                e,
                                                producto._id,
                                                producto.nombreSubCategoria
                                              )
                                            }
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="1em"
                                              height="1em"
                                              viewBox="0 0 16 16"
                                            >
                                              <path
                                                fill="currentColor"
                                                d="M12.32 8a3 3 0 0 0-2-.7H5.63A1.59 1.59 0 0 1 4 5.69a2 2 0 0 1 0-.25a1.59 1.59 0 0 1 1.63-1.33h4.62a1.59 1.59 0 0 1 1.57 1.33h1.5a3.08 3.08 0 0 0-3.07-2.83H8.67V.31H7.42v2.3H5.63a3.08 3.08 0 0 0-3.07 2.83a2.09 2.09 0 0 0 0 .25a3.07 3.07 0 0 0 3.07 3.07h4.74A1.59 1.59 0 0 1 12 10.35a1.86 1.86 0 0 1 0 .34a1.59 1.59 0 0 1-1.55 1.24h-4.7a1.59 1.59 0 0 1-1.55-1.24H2.69a3.08 3.08 0 0 0 3.06 2.73h1.67v2.27h1.25v-2.27h1.7a3.08 3.08 0 0 0 3.06-2.73v-.34A3.06 3.06 0 0 0 12.32 8"
                                              />
                                            </svg>
                                          </div>
                                          <div
                                            className="hover:cursor-pointer"
                                            title="Eliminar Gasto"
                                            onClick={(e) =>
                                              handleEliminarProducto(
                                                e,
                                                producto._id
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
                          )}
                        </>
                      ) : null}

                      <input
                        type="submit"
                        className="mt-4 w-full cursor-pointer rounded bg-blue-600 p-3 text-sm font-bold uppercase text-white transition-colors hover:bg-blue-300"
                        value={"Guardar 💰"}
                      />
                    </>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalNuevoMercado;
