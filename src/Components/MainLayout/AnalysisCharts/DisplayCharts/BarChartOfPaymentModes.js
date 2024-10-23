import BarChart from "../ChartComponents/BarChart";

const BarChartOfPaymentModes = ({ expenses = [] }) => {
  const paymentModeMap = {};
  expenses.forEach(expense => {
    if(!paymentModeMap[expense.paymentMode])
      paymentModeMap[expense.paymentMode] = 0;
    paymentModeMap[expense.paymentMode] += expense.amount;
  });
  return (
    <BarChart
      title="Expenses By Payment Modes"
      labels={Object.keys(paymentModeMap)}
      datasets={[
        {
          label: "Total Amount" || null,
          backgroundColor: "rgb(0, 0, 128)",
          borderColor: "rgb(0, 0, 128)",
          data: Object.values(paymentModeMap),
        },
      ]}
    />
  );
};

export default BarChartOfPaymentModes;
