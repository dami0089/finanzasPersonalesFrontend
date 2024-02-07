import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useState } from "react";
import useGastos from "../hooks/useGastos";
import useUsuarios from "../hooks/useUsuarios";

export const MonthlyExpensesChart = () => {
  const {
    chartAcumulado,
    obtenerChatAcumulado,
    setActualizarListadoMovimientos,
    actualizarListadoMovimientos,
  } = useGastos();
  const { auth } = useUsuarios();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const obtenerChart = async () => {
      await obtenerChatAcumulado(auth._id);
    };
    obtenerChart();
  }, []);

  useEffect(() => {
    const obtenerChart = async () => {
      if (actualizarListadoMovimientos) {
        await obtenerChatAcumulado(auth._id);
        setActualizarListadoMovimientos(false);
      }
    };
    obtenerChart();
  }, [actualizarListadoMovimientos]);

  useEffect(() => {
    if (chartAcumulado && Object.keys(chartAcumulado).length) {
      prepararDatosParaGrafico();
    }
  }, [chartAcumulado, windowWidth]); // Ahora también depende de windowWidth

  const prepararDatosParaGrafico = () => {
    const labels = Object.keys(chartAcumulado);
    const data = Object.values(chartAcumulado);
    const monthsToShow = windowWidth < 768 ? 3 : 12; // Cambiar a 768 por el breakpoint deseado

    setChartData({
      labels: labels.slice(Math.max(labels.length - monthsToShow, 0)),
      datasets: [
        {
          label: "Gastos por mes $ ",
          data: data.slice(Math.max(data.length - monthsToShow, 0)),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const options = {
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "800px", maxHeight: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
