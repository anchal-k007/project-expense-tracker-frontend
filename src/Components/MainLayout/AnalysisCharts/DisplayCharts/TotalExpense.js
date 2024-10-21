import DisplayBlock from "../ChartComponents/DisplayBlock";

const TotalExpense = ({ expenses = [] }) => {
  const totalExpense = expenses.reduce(
    (totalExpense, expense) => (totalExpense += parseInt(expense.amount)),
    0
  );
  return <DisplayBlock title="Total Expense" data={totalExpense}/>
};

export default TotalExpense;
