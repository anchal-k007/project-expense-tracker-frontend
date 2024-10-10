import { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";
import styles from "./Expenses.module.css";
import expensesContext from "../../../store/expenses_context";

const Expenses = ({ isLoading }) => {
  const { expensesList } = useContext(expensesContext);
  const total = expensesList.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );
  return (
    <div className={styles["expense-layout"]}>
      <h1>
        {isLoading && "Fetching Expenses..."}
        {!isLoading &&
          (expensesList.length === 0 ? "No Expenses To Show" : "Expenses")}
      </h1>
      {!isLoading && expensesList.length !== 0 && (
        <table className={styles["expenses-table"]}>
          <tbody>
            <ExpenseTableHeader />
            {expensesList.map((expenseItem) => {
              return (
                <ExpenseItem key={expenseItem._id} expenseItem={expenseItem} />
              );
            })}
          </tbody>
        </table>
      )}
      {!isLoading && expensesList.length !== 0 && (
        <div className={styles["display-total"]}>Total = &#8377;{total}</div>
      )}
    </div>
  );
};

export default Expenses;
