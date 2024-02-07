import React, { useEffect } from "react";
import useGastos from "../hooks/useGastos";
import Swal from "sweetalert2";
import useUsuarios from "../hooks/useUsuarios";

const Mercado = () => {
  const {
    setNombreCategoria,
    setIdCategoria,
    handleModalEditarCategoria,
    actualizarListadoCategorias,
    setActualizarListadoCategorias,
    eliminarCategoria,
    handleModalSubCategoria,
    eliminarSubCategoria,
    handleModalEditarSubCategoria,
    categoriaMercado,
    obtenerCategoriaMercado,
  } = useGastos();

  const { auth } = useUsuarios();

  useEffect(() => {
    const traerCategorias = async () => {
      await obtenerCategoriaMercado(auth._id);
    };
    traerCategorias();
  }, []);

  useEffect(() => {
    const traerCategorias = async () => {
      if (actualizarListadoCategorias) {
        await obtenerCategoriaMercado(auth._id);
        setActualizarListadoCategorias(false);
      }
    };
    traerCategorias();
  }, [actualizarListadoCategorias]);

  const handleEditar = (e, id, nombre) => {
    e.preventDefault();
    handleModalEditarCategoria();
    setIdCategoria(id);
    setNombreCategoria(nombre);
  };

  const handleEditarSub = (e, id, nombre) => {
    e.preventDefault();
    setIdCategoria(id);
    setNombreCategoria(nombre);
    handleModalEditarSubCategoria();
  };

  const handleEliminarCategoria = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres eliminar la categoria?",
      text: "Esta accion es irrecuperable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarCategoria(id);
        setIdCategoria("");
        setActualizarListadoCategorias(true);
      }
    });
  };

  const handleEliminarSubCategoria = (e, id) => {
    console.log(id);
    e.preventDefault();
    Swal.fire({
      title: "Seguro queres eliminar la sub categoria?",
      text: "Esta accion es irrecuperable!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarSubCategoria(id);
        setActualizarListadoCategorias(true);
      }
    });
  };

  const handleSubCategoria = (e, nombre, id) => {
    e.preventDefault();
    handleModalSubCategoria();
    setNombreCategoria(nombre);
    setIdCategoria(id);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Mercado</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {categoriaMercado.map((categoria) => (
                <React.Fragment key={categoria._id}>
                  <tr>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm font-bold uppercase text-center">
                      {categoria.nombre}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      {/* Opcionalmente vacío para alinear con las subcategorías si se requiere */}
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm">
                      <div className="flex items-center justify-center gap-4 ">
                        <div
                          className="hover:cursor-pointer "
                          title="Agregar Sub Categoria"
                          onClick={(e) =>
                            handleSubCategoria(
                              e,
                              categoria.nombre,
                              categoria._id
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-plus "
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                          </svg>
                        </div>
                        <div
                          className="hover:cursor-pointer"
                          title="Editar Categoria"
                          onClick={(e) =>
                            handleEditar(e, categoria._id, categoria.nombre)
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
                          title="Eliminar Categoria"
                          onClick={(e) =>
                            handleEliminarCategoria(e, categoria._id)
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
                  {categoria.subCategorias &&
                    categoria.subCategorias.map((subCategoria) => (
                      <tr key={subCategoria._id}>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          {/* Información adicional de la subcategoría si se requiere */}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm pl-10 text-center italic text-blue-300">
                          {subCategoria.nombre}
                        </td>
                        <td className="px-5 py-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center justify-center gap-4 ">
                            <div>
                              <p className="text-transparent">a</p>
                            </div>
                            <div
                              className="hover:cursor-pointer"
                              title="Editar Categoria"
                              onClick={(e) =>
                                handleEditarSub(
                                  e,
                                  subCategoria.id,
                                  subCategoria.nombre
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="text-blue-300"
                              >
                                <path
                                  fill="currentColor"
                                  d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
                                />
                              </svg>
                            </div>
                            <div
                              className="hover:cursor-pointer"
                              title="Eliminar Categoria"
                              onClick={(e) =>
                                handleEliminarSubCategoria(e, subCategoria.id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24"
                                className="text-blue-300"
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Mercado;
