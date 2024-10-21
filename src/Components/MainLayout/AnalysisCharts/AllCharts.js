import styles from "./AllCharts.module.css";
import BarChart from "./ChartComponents/BarChart";
import DisplayBlock from "./ChartComponents/DisplayBlock";
import BarChartOfExepenses from "./DisplayCharts/BarChartOfExpenses";
import HighestExpense from "./DisplayCharts/HighestExpense";
import HighestExpenseOnDate from "./DisplayCharts/HighestExpenseDate";
import TotalExpense from "./DisplayCharts/TotalExpense";
import BarChartOfPaymentModes from "./DisplayCharts/BarChartOfPaymentModes";

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

const AllCharts = ({ isLoading = false, title, fetchedData = [] }) => {
  let displayText = title;
  if (isLoading) displayText = "Fetching Data, This May Take A Moment...";
  if (!isLoading && fetchedData && fetchedData.length === 0)
    displayText = "No Data To Show";

  const expensesGroupedByDate = {}; // maintain a map
  if (fetchedData && fetchedData.length !== 0)
    fetchedData.forEach((expense) => {
      if (
        Object.keys(expensesGroupedByDate).findIndex(
          (key) => key === expense.date
        ) === -1
      )
        expensesGroupedByDate[expense.date] = [];
      expensesGroupedByDate[expense.date].push(expense);
    });

  return (
    <div className={styles["all-charts-container"]}>
      <h1>{displayText}</h1>
      {!isLoading && fetchedData && fetchedData.length !== 0 && (
        <div className={styles["all-charts-flexbox"]}>
          <TotalExpense expenses={fetchedData} />
          <HighestExpense expenses={fetchedData} />
          <HighestExpenseOnDate expensesGroupedByDate={expensesGroupedByDate} />
          <BarChartOfExepenses expensesGroupedByDate={expensesGroupedByDate} />
          <BarChartOfPaymentModes expenses={fetchedData} />
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
      )}
    </div>
  );
};

export default AllCharts;
