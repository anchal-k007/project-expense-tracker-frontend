import Chart from 'chart.js/auto';    // required 
import { Bar } from "react-chartjs-2";
import ResizableBox from "./ResizableBox";
import styles from "./BarChart.module.css"

const BarChart = ({
  title = "",
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
      <div className={styles["bar-chart"]}>
        <h1 className={styles.title}>{title}</h1>
        <Bar data={data} />
      </div>
    </ResizableBox>
  );
};

export default BarChart;
