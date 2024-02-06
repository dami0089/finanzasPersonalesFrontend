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

  useEffect(() => {
    const obtenerChart = async () => {
      await obtenerChatAcumulado(auth._id);
    };
    obtenerChart();
  }, []); // Sin dependencias, se ejecuta solo en la carga del componente

  useEffect(() => {
    const obtenerChart = async () => {
      if (actualizarListadoMovimientos) {
        await obtenerChatAcumulado(auth._id);
        setActualizarListadoMovimientos(false);
      }
    };
    obtenerChart();
  }, [actualizarListadoMovimientos]); // Sin dependencias, se ejecuta solo en la carga del componente

  useEffect(() => {
    // Esta función ahora se ejecuta cada vez que chartAcumulado se actualiza
    if (chartAcumulado && Object.keys(chartAcumulado).length) {
      prepararDatosParaGrafico();
    }
  }, [chartAcumulado]); // Dependencia en chartAcumulado

  const prepararDatosParaGrafico = () => {
    const labels = Object.keys(chartAcumulado);
    const data = Object.values(chartAcumulado);

    setChartData({
      labels,
      datasets: [
        {
          label: "Gastos por mes $ ",
          data,
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
    <div style={{ height: "500px", maxHeight: "500px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};
