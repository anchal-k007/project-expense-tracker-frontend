import { useState } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import DUMMY_EXPENSES from "./../../utils/dummyExpenses";
import { getDateFromDateString, getDateStringFromDate } from "../../utils/convertDateFormat";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  // to get today's date at 0000 hours
  const today = getDateFromDateString(getDateStringFromDate(new Date()));

  const [pickedDate, setPickedDate] = useState(today);
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
    setPickedDate(getDateFromDateString(newDate));
  };

  const addExpenseItemToList = (newExpenseItem) => {
    newExpenseItem.id = Date.now().toString();
    setExpenseList(prevList => {
      const newExpenseList = [...prevList];
      newExpenseList.push(newExpenseItem);
      return newExpenseList
    });
  }

  return (
    <div className={styles["main-layout"]}>
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses displayList={displayList} />
      <AddExpense pickedDate={pickedDate} addExpenseItem={addExpenseItemToList} />
    </div>
  );
};

export default MainLayout;
