import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles["main-layout"]}>
      <DatePicker />
      <Expenses />
      <AddExpense />
    </div>
  );
};

export default MainLayout;