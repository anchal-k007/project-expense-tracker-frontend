import { useState } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import Notification from "./Modal/Notification";
import DUMMY_EXPENSES from "./../../utils/dummyExpenses";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../utils/convertDateFormat";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  // to get today's date at 0000 hours
  const today = getDateFromDateString(getDateStringFromDate(new Date()));

  const [pickedDate, setPickedDate] = useState(today);
  const [expenseList, setExpenseList] = useState(DUMMY_EXPENSES);
  const [notification, setNotification] = useState({
    showNotification: false,
    status: "",
    message: "",
  });

  const handleNotification = (status, message, timeInSeconds = 1.5) => {
    setNotification({
      showNotification: true,
      status,
      message,
    });
    setTimeout(() => {
      setNotification({
        showNotification: false,
      });
    }, timeInSeconds * 1000);
  };

  const displayList = expenseList.filter((expense) => {
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

  const hanldeAddExpenseItemToList = (newExpenseItem) => {
    newExpenseItem.paymentId = Date.now().toString();
    setExpenseList((prevList) => {
      const newExpenseList = [...prevList];
      newExpenseList.push(newExpenseItem);
      return newExpenseList;
    });
  };

  const handleDeleteItemFromList = (itemId) => {
    setExpenseList(
      expenseList.filter((expenseItem) => expenseItem.paymentId !== itemId)
    );
  };

  const handleUpdateExpenseItem = (updatedItem) => {
    setExpenseList((prevExpenseList) => {
      return prevExpenseList.map((expenseItem) => {
        if (expenseItem.paymentId === updatedItem.paymentId) {
          expenseItem = { ...updatedItem };
        }
        return expenseItem;
      });
    });
  };

  return (
    <div className={styles["main-layout"]}>
      {notification.showNotification && (
        <Notification notification={notification} />
      )}
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses
        displayList={displayList}
        handleDeleteItemFromList={handleDeleteItemFromList}
        handleUpdateExpenseItem={handleUpdateExpenseItem}
        handleNotification={handleNotification}
      />
      <AddExpense
        pickedDate={pickedDate}
        handleAddExpenseItem={hanldeAddExpenseItemToList}
        handleNotification={handleNotification}
      />
    </div>
  );
};

export default MainLayout;
