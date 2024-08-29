import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={styles["main-layout"]}>
      <DatePicker />
      <Expenses />
    </div>
  );
};

export default MainLayout;