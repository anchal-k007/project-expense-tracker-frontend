import DisplayBlock from "../ChartComponents/DisplayBlock";

const HighestExpenseOnDate = ({ expensesGroupedByDate = [] }) => {
  let highestExpense = 0,
    highestExpenseDate = "";
  Object.entries(expensesGroupedByDate).forEach(([key, value]) => {
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
