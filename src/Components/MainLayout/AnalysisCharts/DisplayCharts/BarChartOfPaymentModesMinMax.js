import BarChart from "../ChartComponents/BarChart";

const BarChartOfPaymentModesMinMax = ({ expenses = [] }) => {
  const paymentModeMap = {};
  expenses.forEach(expense => {
    if(!paymentModeMap[expense.paymentMode]) {
      paymentModeMap[expense.paymentMode] = {
        min: Number.MAX_SAFE_INTEGER,
        max: -1
      }
    }
    paymentModeMap[expense.paymentMode].min = Math.min(expense.amount, paymentModeMap[expense.paymentMode].min);
    paymentModeMap[expense.paymentMode].max = Math.max(expense.amount, paymentModeMap[expense.paymentMode].max);
  });
  const minArray = Object.values(paymentModeMap).map(value => value.min);
  const maxArray = Object.values(paymentModeMap).map(value => value.max);
  return (
    <BarChart
      title="Min and Max Expense By Payment Mode"
      labels={Object.keys(paymentModeMap)}
      datasets={[
        {
          label: "Maximum Expense" || null,
          backgroundColor: "rgb(0, 0, 128)",
          borderColor: "rgb(0, 0, 128)",
          data: maxArray,
        },
        {
          label: "Minimum Expense" || null,
          backgroundColor: "rgb(100, 149, 237)",
          borderColor: "rgb(100, 149, 237)",
          data: minArray,
        },
      ]}
    />
  );
};

export default BarChartOfPaymentModesMinMax;
