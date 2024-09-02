import styles from "./Expenses.module.css";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";

const Expenses = ({
  displayList,
  handleDeleteItemFromList,
  handleUpdateExpenseItem,
}) => {
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
                  key={expenseItem.paymentId}
                  expenseItem={expenseItem}
                  handleDeleteItemFromList={handleDeleteItemFromList}
                  handleUpdateExpenseItem={handleUpdateExpenseItem}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Expenses;
