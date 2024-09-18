import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";
import styles from "./Expenses.module.css";

const Expenses = ({ displayList }) => {
  const total = displayList.reduce((total, expense) => total + parseInt(expense.amount), 0);
  return (
    <div className={styles["expense-layout"]}>
      <h1>{displayList.length === 0 ? "No Expenses To Show" : "Expenses"}</h1>
      {displayList.length !== 0 && (
        <table className={styles["expenses-table"]}>
          <tbody>
            <ExpenseTableHeader />
            {displayList.map((expenseItem) => {
              return (
                <ExpenseItem
                  key={expenseItem.expenseId}
                  expenseItem={expenseItem}
                />
              );
            })}
          </tbody>
        </table>
      )}
      {displayList.length !== 0 && (
        <div className={styles["display-total"]}>
          Total = &#8377;{total}
        </div>
      )}
    </div>
  );
};

export default Expenses;
