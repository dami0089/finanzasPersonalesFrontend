import { createContext, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes desde el paquete prop-types
import clienteAxios from "../configs/clienteAxios";
import { toast } from "react-toastify";

const GastosContext = createContext();

const GastosProvider = ({ children }) => {
  const [modalGasto, setModalGasto] = useState(false);
  const [modalCategoria, setModalCategoria] = useState(false);
  const [modalEditarCategoria, setModalEditarCategoria] = useState(false);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [actualizarListadoCategorias, setActualizarListadoCategorias] =
    useState(false);

  const [actualizarListadoMovimientos, setActualizarListadoMovimientos] =
    useState(false);
  const [modalEditarGasto, setModalEditarGasto] = useState(false);
  const [fechaGasto, setFechaGasto] = useState("");
  const [conceptoGasto, setConceptoGasto] = useState("");
  const [descripcionGasto, setDescripcionGasto] = useState("");
  const [categoriaGasto, setCategoriaGasto] = useState("");
  const [importeGasto, setImporteGasto] = useState("");
  const [idGastoEditar, setIdGastoEditar] = useState("");
  const [modalNuevaTarjeta, setModalNuevaTarjeta] = useState(false);

  const [nombreSubCategoria, setNombreSubCategoria] = useState("");

  const [modalSubCategoria, setModalSubCategoria] = useState(false);

  const [modalEditarSubCategoria, setModalEditarSubCategoria] = useState(false);

  const [idSubCategoria, setIdSubCategoria] = useState("");

  const [modalGasto0, setModalGasto0] = useState(false);

  const [modalMercado, setModalMercado] = useState(false);

  const [modalNuevoSuperMercado, setModalNuevoSuperMercado] = useState(false);
  const [nombreSupermercado, setNombreSupermercado] = useState("");
  const [direccionSupermercado, setDireccionSupermercado] = useState("");
  const [idProductoFiltrado, setIdProductoFiltrado] = useState("");
  const [modalNuevoProductoMercado, setModalNuevoProductoMercado] =
    useState(false);

  const [registrarProductos, setRegistrarProductos] = useState("no");

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const [modalImporteProducto, setModalImporteProducto] = useState("");
  const [nombreProd, setNombreProd] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [importeProducto, setImporteProducto] = useState("");

  const [idSuperMercado, setIdSuperMercado] = useState("");

  const handleModalImporteProducto = () => {
    setModalImporteProducto(!modalImporteProducto);
  };

  const handleModalNuevoProductoMercado = () => {
    setModalNuevoProductoMercado(!modalNuevoProductoMercado);
  };

  const handleModalSuperMercado = () => {
    setModalNuevoSuperMercado(!modalNuevoSuperMercado);
  };

  const handleModalMercado = () => {
    setModalMercado(!modalMercado);
  };

  const handleModalEditarSubCategoria = () => {
    setModalEditarSubCategoria(!modalEditarSubCategoria);
  };

  const handleModalSubCategoria = () => {
    setModalSubCategoria(!modalSubCategoria);
  };

  const handleModalNuevaTarjeta = () => {
    setModalNuevaTarjeta(!modalNuevaTarjeta);
  };

  const handleModalEditarGasto = () => {
    setModalEditarGasto(!modalEditarGasto);
  };

  const handleModalGasto = () => {
    setModalGasto(!modalGasto);
  };

  const handleModalGasto0 = () => {
    setModalGasto0(!modalGasto0);
  };

  const handleModalCategoria = () => {
    setModalCategoria(!modalCategoria);
  };

  const handleModalEditarCategoria = () => {
    setModalEditarCategoria(!modalEditarCategoria);
  };

  const nuevoGasto = async (
    fecha,
    concepto,
    descripcion,
    categoria,
    importe,
    usuario
  ) => {
    const info = {
      fecha,
      concepto,
      descripcion,
      categoria,
      importe,
      usuario,
    };
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(`gastos/nuevo-gasto/`, info);

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaCategoria = async (nombre, subCat, usuario) => {
    const info = {
      nombre,
      subCat,
      usuario,
    };

    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(`gastos/nueva-categoria/`, info);

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevaSubCategoria = async (categoria, nombreSubCategoria, usuario) => {
    const info = {
      categoria,
      nombreSubCategoria,
      usuario,
    };

    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/nueva-sub-categoria/`,
        info
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [categorias, setCategorias] = useState([]);

  const obtenerCategorias = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-categorias/${id}`,
        {}
      );

      setCategorias(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [categoriaMercado, setCategoriaMercado] = useState([]);

  const obtenerCategoriaMercado = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-categoria-mercado/${id}`,
        {}
      );

      setCategoriaMercado(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarCategoria = async (id, nombre) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/editar-categoria/${id}`,
        { nombre }
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarSubCategoria = async (id, nombre) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/editar-sub-categoria/${id}`,
        { nombre }
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.delete(
        `gastos/eliminar-categoria/${id}`,
        {}
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const eliminarSubCategoria = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.delete(
        `gastos/eliminar-sub-categoria/${id}`,
        {}
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [gastos, setGastos] = useState([]);

  const obtenerGastos = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-gastos/${id}`,
        {}
      );

      setGastos(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editarGasto = async (
    id,
    fecha,
    concepto,
    descripcion,
    categoria,
    importe
  ) => {
    const info = {
      fecha,
      concepto,
      descripcion,
      categoria,
      importe,
    };
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/editar-gasto/${id}`,
        info
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [chartCategorias, setChartCategoria] = useState([]);

  const obtenerGastosParaChart = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      console.log(id);
      const { data } = await clienteAxios.get(
        `gastos/obtener-chart-gastos-categoria/${id}`,
        {}
      );

      setChartCategoria(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [chartAcumulado, setChartAcumulado] = useState([]);

  const obtenerChatAcumulado = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-chart-gastos-acumulados/${id}`,
        {}
      );

      setChartAcumulado(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [dash, setDash] = useState([]);

  const obtenerDash = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(`gastos/obtener-dash/${id}`, {});

      setDash(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarGasto = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.delete(
        `gastos/eliminar-movimiento/${id}`,
        {}
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoSupermercado = async (nombre, direccion, usuario) => {
    const info = {
      nombre,
      direccion,
      usuario,
    };
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/nuevo-supermercado/`,
        info
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [supermercados, setSupermercados] = useState([]);

  const obtenerSupermercados = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-supermercados/${id}`,
        {}
      );

      setSupermercados(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [productosMercado, setProductosMercado] = useState([]);

  const obtenerProductosMercado = async (id) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.get(
        `gastos/obtener-productos-mercado/${id}`,
        {}
      );

      setProductosMercado(data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoProductoMercado = async (nombreSubCategoria, usuario) => {
    const info = {
      nombreSubCategoria,
      usuario,
    };

    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(`gastos/nuevo-producto/`, info);

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const nuevoGastoSupermercado = async (gasto) => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) return;
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      const { data } = await clienteAxios.post(
        `gastos/nuevo-gasto-supermercado/`,
        gasto
      );

      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <GastosContext.Provider
      value={{
        modalGasto,
        handleModalGasto,
        nuevoGasto,
        handleModalCategoria,
        modalCategoria,
        nuevaCategoria,
        categorias,
        obtenerCategorias,
        handleModalEditarCategoria,
        modalEditarCategoria,
        nombreCategoria,
        setNombreCategoria,
        idCategoria,
        setIdCategoria,
        editarCategoria,
        actualizarListadoCategorias,
        setActualizarListadoCategorias,
        eliminarCategoria,
        gastos,
        obtenerGastos,
        actualizarListadoMovimientos,
        setActualizarListadoMovimientos,
        modalEditarGasto,
        handleModalEditarGasto,
        fechaGasto,
        setFechaGasto,
        conceptoGasto,
        setConceptoGasto,
        descripcionGasto,
        setDescripcionGasto,
        categoriaGasto,
        setCategoriaGasto,
        importeGasto,
        setImporteGasto,
        idGastoEditar,
        setIdGastoEditar,
        editarGasto,
        chartCategorias,
        obtenerGastosParaChart,
        chartAcumulado,
        obtenerChatAcumulado,
        dash,
        obtenerDash,
        eliminarGasto,
        handleModalNuevaTarjeta,
        modalNuevaTarjeta,
        nombreSubCategoria,
        setNombreSubCategoria,
        handleModalSubCategoria,
        modalSubCategoria,
        nuevaSubCategoria,
        eliminarSubCategoria,
        handleModalEditarSubCategoria,
        modalEditarSubCategoria,
        editarSubCategoria,
        idSubCategoria,
        setIdSubCategoria,
        handleModalGasto0,
        modalGasto0,
        categoriaMercado,
        obtenerCategoriaMercado,
        handleModalMercado,
        modalMercado,
        nuevoSupermercado,
        handleModalSuperMercado,
        modalNuevoSuperMercado,
        nombreSupermercado,
        setNombreSupermercado,
        direccionSupermercado,
        setDireccionSupermercado,
        supermercados,
        obtenerSupermercados,
        productosMercado,
        obtenerProductosMercado,
        idProductoFiltrado,
        setIdProductoFiltrado,
        handleModalNuevoProductoMercado,
        modalNuevoProductoMercado,
        nuevoProductoMercado,
        registrarProductos,
        setRegistrarProductos,

        productosSeleccionados,
        setProductosSeleccionados,
        handleModalImporteProducto,
        modalImporteProducto,
        nombreProd,
        setNombreProd,
        idProducto,
        setIdProducto,
        idSuperMercado,
        setIdSuperMercado,
        importeProducto,
        setImporteProducto,
        nuevoGastoSupermercado,
      }}
    >
      {children}
    </GastosContext.Provider>
  );
};

// Aquí definimos las propTypes para GastosProvider
GastosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GastosProvider };
export default GastosContext;
