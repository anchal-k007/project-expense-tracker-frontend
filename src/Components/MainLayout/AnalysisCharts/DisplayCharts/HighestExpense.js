import DisplayBlock from "../ChartComponents/DisplayBlock";

const HighestExpense = ({ expenses = [] }) => {
  const highestExpense = expenses.reduce((prev, curr) => {
    prev = (prev && prev.amount > curr.amount ? prev : curr);
    return prev;
  });
  return <DisplayBlock title="Highest Individual Expense" data={`₹${highestExpense.amount}`}/>
};

export default HighestExpense;
