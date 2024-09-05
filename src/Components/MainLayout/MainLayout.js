import { useState , useContext } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import Notification from "./Modal/Notification";
import DUMMY_EXPENSES from "./../../utils/dummyExpenses";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../utils/convertDateFormat";
import notificationContext from "../../store/notification_context";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  // to get today's date at 0000 hours
  const today = getDateFromDateString(getDateStringFromDate(new Date()));

  const [pickedDate, setPickedDate] = useState(today);
  const [expenseList, setExpenseList] = useState(DUMMY_EXPENSES);
  const {showNotification} = useContext(notificationContext);

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
      {showNotification && (
        <Notification />
      )}
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses
        displayList={displayList}
        handleDeleteItemFromList={handleDeleteItemFromList}
        handleUpdateExpenseItem={handleUpdateExpenseItem}
        />
      <AddExpense
        pickedDate={pickedDate}
        handleAddExpenseItem={hanldeAddExpenseItemToList}
        />
    </div>
  );
};

export default MainLayout;
