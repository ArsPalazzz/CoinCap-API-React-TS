import { Line } from "react-chartjs-2";
import { AreaChartProps } from "./../../../models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { HistoryObject } from "../../../models";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaChart = ({ value }: AreaChartProps) => {
  const labels = useMemo(
    () =>
      value
        .filter((item: HistoryObject, index: number) => index % 3 === 0)
        .map((item: HistoryObject) => item.date.slice(0, -14)),
    [value]
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: value.map((item: HistoryObject) => item.priceUsd),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={chartOptions} data={chartData} />;
};

export default AreaChart;
