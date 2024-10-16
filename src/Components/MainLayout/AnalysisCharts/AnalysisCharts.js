import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ResizableBox from "./ChartComponents/ResizableBox";
import DisplayBlock from "./ChartComponents/DisplayBlock";
const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
      {
        label: "My Second dataset",
        backgroundColor: "rgb(0, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  return (
    <>
      <ResizableBox>
        <Bar data={data} />
      </ResizableBox>
      <DisplayBlock title="Test" data="100" />
    </>
  );
};
export default BarChart;
