import { useState, useContext, useEffect } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import Notification from "./Modal/Notification";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../utils/convertDateFormat";
import notificationContext from "../../store/notification_context";

import styles from "./MainLayout.module.css";
import expensesContext from "../../store/expenses_context";

const MainLayout = () => {
  // to get today's date at 0000 hours
  const today = getDateFromDateString(getDateStringFromDate(new Date()));

  const [pickedDate, setPickedDate] = useState(today);
  const { showNotification } = useContext(notificationContext);

  const { getExpensesList } =
    useContext(expensesContext);

  useEffect(() => {
    async function updateDisplayList() {
      try {
        await getExpensesList(pickedDate);
      } catch (err) {
        console.log(err);
      }
    }
    updateDisplayList();
  }, [pickedDate]);

  const updatePickedDate = (newDate) => {
    // Edge case when user selects clear option
    if (!newDate) {
      setPickedDate(new Date());
      return;
    }
    setPickedDate(getDateFromDateString(newDate));
  };

  return (
    <div className={styles["main-layout"]}>
      {showNotification && <Notification />}
      <DatePicker pickedDate={pickedDate} updatePickedDate={updatePickedDate} />
      <Expenses />
      <AddExpense pickedDate={pickedDate} />
    </div>
  );
};

export default MainLayout;
