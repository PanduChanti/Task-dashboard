import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartWidget = ({ widget }) => {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: widget.name,
        data: [12, 3, 7],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  switch (widget.type) {
    case "pie":
      return (
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
      );

    default:
      return <div>Unsupported chart type</div>;
  }
};

export default ChartWidget;
