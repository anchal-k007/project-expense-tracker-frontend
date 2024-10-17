import { Bar } from "react-chartjs-2";
import ResizableBox from "./ResizableBox";

const BarChart = ({
  labels = [],
  datasets = [
    {
      label: "string" || null,
      backgroundColor: "rgb(255, 255, 255)",
      borderColor: "rgb(255, 255, 255)",
      data: [],
    },
  ],
}) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };
  return (
    <ResizableBox>
      <Bar data={data} />
    </ResizableBox>
  );
};

export default BarChart;
