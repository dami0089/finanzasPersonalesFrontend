import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import useGastos from "../hooks/useGastos";
import useUsuarios from "../hooks/useUsuarios";

export const CategoryExpensesChart = () => {
  const {
    chartCategorias,
    obtenerGastosParaChart,
    setActualizarListadoMovimientos,
    actualizarListadoMovimientos,
  } = useGastos();
  const [chartData, setChartData] = useState(null); // Inicialización en null

  const { auth } = useUsuarios();

  useEffect(() => {
    // Definir una función async dentro del useEffect
    const obtenerDatos = async () => {
      await obtenerGastosParaChart(auth._id);
    };

    obtenerDatos();

    // Este efecto debe correr solo una vez al montar el componente,
    // por lo tanto, no necesita dependencias.
  }, []); // Array de dependencias vacío para correr solo en el montaje

  useEffect(() => {
    // Definir una función async dentro del useEffect
    const obtenerDatos = async () => {
      if (actualizarListadoMovimientos) {
        await obtenerGastosParaChart(auth._id);
        setActualizarListadoMovimientos(false);
      }
    };

    obtenerDatos();

    // Este efecto debe correr solo una vez al montar el componente,
    // por lo tanto, no necesita dependencias.
  }, [actualizarListadoMovimientos]); // Array de dependencias vacío para correr solo en el montaje

  useEffect(() => {
    // Preparar los datos del gráfico cada vez que chartCategorias cambie
    if (chartCategorias && Object.keys(chartCategorias).length > 0) {
      const labels = Object.keys(chartCategorias);
      const data = Object.values(chartCategorias);

      setChartData({
        labels,
        datasets: [
          {
            label: "Gastos por categoría $ ",
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [chartCategorias]); // Dependiendo de chartCategorias para reaccionar a sus cambios

  // No es necesario tener un segundo useEffect para actualizarListadoMovimientos
  // si este efecto realmente necesita activarse bajo ciertas condiciones, debe manejarlo
  // de manera que no interfiera con la carga inicial.

  return chartData ? (
    <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
  ) : (
    <p>Cargando datos del gráfico...</p> // Placeholder mientras carga los datos
  );
};
