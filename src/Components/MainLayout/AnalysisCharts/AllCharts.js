import styles from "./AllCharts.module.css";
import BarChart from "./ChartComponents/BarChart";
import DisplayBlock from "./ChartComponents/DisplayBlock";

const labels = ["January", "February", "March", "April", "May", "June"];
const datasets = [
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
];

const AllCharts = ({ isLoading = false, title }) => {
  return (
    <div className={styles["all-charts-container"]}>
      <h1>{isLoading ? "Fetching Data, This May Take A Moment..." : title}</h1>
      <div className={styles["all-charts-flexbox"]}>
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
        <BarChart labels={labels} datasets={datasets} />
        <DisplayBlock title="Test" data="100" />
      </div>
    </div>
  );
};

export default AllCharts;
