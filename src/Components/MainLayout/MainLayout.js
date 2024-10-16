import { useState, useContext, useEffect } from "react";

import DatePicker from "./DatePicker/DatePicker";
import Expenses from "./Expenses/Expenses";
import AddExpense from "./AddExpense/AddExpense";
import Notification from "./Modal/Notification";
import AnalysisCharts from "./AnalysisCharts/AnalysisCharts";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../utils/convertDateFormat";
import notificationContext from "../../store/notification_context";

import styles from "./MainLayout.module.css";
import expensesContext from "../../store/expenses_context";
import CONSTANTS from "../../utils/constants";

const MainLayout = () => {
  // to get today's date at 0000 hours
  const today = getDateFromDateString(getDateStringFromDate(new Date()));

  const [pickedDate, setPickedDate] = useState(today);
  const { showNotification, handleNotification } = useContext(notificationContext);
  const [isLoading, setIsLoading] = useState(false);

  const { getExpensesList } =
    useContext(expensesContext);

  useEffect(() => {
    async function updateDisplayList() {
      setIsLoading(true);
      try {
        await getExpensesList(pickedDate);
      } catch (err) {
        handleNotification(
          CONSTANTS.NOTIFICATION_STATUS_ERROR,
          err.message,
          CONSTANTS.NOTIFICATION_TIME_ERROR
        );
      }
      setIsLoading(false);
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
      <Expenses isLoading={isLoading}/>
      <AddExpense pickedDate={pickedDate} />
      <AnalysisCharts />
    </div>
  );
};

export default MainLayout;
