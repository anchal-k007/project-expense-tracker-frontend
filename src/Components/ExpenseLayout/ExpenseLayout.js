import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";

import styles from "./ExpenseLayout.module.css";

const ExpenseLayout = () => {
  return (
    <div className={styles["expense-layout"]}>
      <DatePicker />
      <Expenses />
    </div>
  );
};

export default ExpenseLayout;