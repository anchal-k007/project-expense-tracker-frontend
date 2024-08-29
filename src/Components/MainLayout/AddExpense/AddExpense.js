import styles from "./AddExpense.module.css";

const AddExpense = () => {
  return (
    <div className={styles["add-expense"]}>
      <button>Add New Expense</button>
    </div>
  );
};

export default AddExpense;