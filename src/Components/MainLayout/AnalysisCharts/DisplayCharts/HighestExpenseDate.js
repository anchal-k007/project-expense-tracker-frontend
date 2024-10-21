import DisplayBlock from "../ChartComponents/DisplayBlock";

const HighestExpenseOnDate = ({ expenses = [] }) => {
  const groupedExpense = {}; // maintain a map
  expenses.forEach((expense) => {
    if (
      Object.keys(groupedExpense).findIndex((key) => key === expense.date) ===
      -1
    )
      groupedExpense[expense.date] = [];
    groupedExpense[expense.date].push(expense);
  });

  let highestExpense = 0,
    highestExpenseDate = "";
  Object.entries(groupedExpense).forEach(([key, value]) => {
    let dayTotal = 0;
    for (const dayExpense of value) dayTotal += dayExpense.amount;

    if (dayTotal >= highestExpense) {
      highestExpense = dayTotal;
      highestExpenseDate = key;
    }
  });

  const displayText = `₹${highestExpense} on ${new Date(
    highestExpenseDate
  ).toLocaleDateString("en-in", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  return <DisplayBlock title="Highest Expense On Date" data={displayText} />;
};

export default HighestExpenseOnDate;
