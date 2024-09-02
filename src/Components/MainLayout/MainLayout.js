import { useState } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import DUMMY_EXPENSES from "./../../utils/dummyExpenses";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const [pickedDate, setPickedDate] = useState(new Date());
  const [expenseList, setExpenseList] = useState(DUMMY_EXPENSES);

  const displayList = expenseList.filter(expense => {
    return expense.date.getTime() === pickedDate.getTime();
  });

  const updatePickedDate = (newDate) => {
    // Edge case when user selects clear option
    if (!newDate) {
      setPickedDate(new Date());
      return;
    }
    let [newPickedYear, newPickedMonth, newPickedDate] = newDate.split("-");
    newPickedMonth = +newPickedMonth; // convert string to number
    newPickedMonth -= 1; // adjust difference between date from datePicker and array indexing of months in js
    setPickedDate(new Date(newPickedYear, newPickedMonth, newPickedDate));
  };

  return (
    <div className={styles["main-layout"]}>
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses displayList={displayList} />
      <AddExpense pickedDate={pickedDate} />
    </div>
  );
};

export default MainLayout;
