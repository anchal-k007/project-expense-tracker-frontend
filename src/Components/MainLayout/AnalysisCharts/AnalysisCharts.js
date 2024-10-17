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

// 1. Date Filter
//    -> State to track both values
//    -> Ensure non-null and correct values (start date before end date)
//    -> Notification for incorrect values
//    -> 
// 2. Create a layout
//    -> CSS to show all the graphs, possibly flex
//    -> Fallback for no data, may need a pre-check call to check if there are documents present in that date
//    -> 
// 3. Make the required calls
//    -> Total expense
//    -> Highest Expense
//    -> Highest total expense on date
//    -> Line chart of expenses
//    -> Bar chart of expenses by payment mode
//    -> Expenses range of each mode (what are the minimum and maximum expenses performed by each payment mode) (optional)
// 4. Add state management to display the analysis page
// 5. For future
//    -> Bar chart by tags
//    -> 
//    -> 
