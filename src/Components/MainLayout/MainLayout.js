import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";

import styles from "./MainLayout.module.css";
import { useState } from "react";

const MainLayout = () => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const updatePickedDate = (newDate) => {
    // Edge case when user selects clear option
    if(!newDate) {
      setPickedDate(new Date());
      return;
    }
    let [newPickedYear, newPickedMonth, newPickedDate] = newDate.split("-");
    newPickedMonth = +newPickedMonth;   // convert string to number
    newPickedMonth -= 1;    // adjust difference between date from datePicker and array indexing of months in js
    setPickedDate(new Date(newPickedYear, newPickedMonth, newPickedDate));
  }
  return (
    <div className={styles["main-layout"]}>
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses pickedDate={pickedDate} />
      <AddExpense />
    </div>
  );
};

export default MainLayout;