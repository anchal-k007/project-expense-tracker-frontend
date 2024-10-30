import DisplayBlock from "../ChartComponents/DisplayBlock";

const HighestExpenseDate = ({ expensesGroupedByDate = [] }) => {
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

  const displayText = `On ${new Date(highestExpenseDate).toLocaleDateString(
    "en-in",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )}`;
  return (
    <DisplayBlock
      title="Highest Expense Date"
      data={`₹${highestExpense}`}
      text={displayText}
    />
  );
};

export default HighestExpenseDate;
