"use client";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Charts = ({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const data = {
    labels: salesData.map(({ month }) => month),
    datasets: [
      {
        data: salesData.map(({ totalSales }) => totalSales),
        backgroundColor: "#ffca2820",
        borderColor: "#ffca28",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default Charts;
