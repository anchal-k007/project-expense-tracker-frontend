import BarChart from "../ChartComponents/BarChart";

const BarChartOfExepenses = ({ expensesGroupedByDate = [] }) => {
  const dates = [],
    expenses = [];
  for (const [date, expensesOnDate] of Object.entries(expensesGroupedByDate)) {
    dates.push(
      new Date(date).toLocaleDateString("en-in", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    const totalExepenseAmountOnDate = expensesOnDate.reduce(
      (accumulator, currVal) => {
        return accumulator + currVal.amount;
      },
      0
    );
    expenses.push(totalExepenseAmountOnDate);
  }
  return (
    <BarChart
      labels={dates}
      datasets={[
        {
          label: "Total Expenses On Date" || null,
          backgroundColor: "rgb(0, 0, 128)",
          borderColor: "rgb(0, 0, 128)",
          data: expenses,
        },
      ]}
    />
  );
};

export default BarChartOfExepenses;
