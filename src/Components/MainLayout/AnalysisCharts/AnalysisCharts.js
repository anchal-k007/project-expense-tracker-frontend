import { useState, useContext } from "react";
import DatePicker from "../DatePicker/DatePicker";
import AllCharts from "./AllCharts";

import notificationContext from "../../../store/notification_context";
import userContext from "../../../store/user_context";

import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../../utils/convertDateFormat";
import CONSTANTS from "../../../utils/constants";

import styles from "./AnalysisCharts.module.css";

const AnalysisCharts = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: getDateFromDateString(getDateStringFromDate(new Date())),
  });

  const [isFetching, setIsFetching] = useState(false);
  const { handleNotification } = useContext(notificationContext);
  const { getToken } = useContext(userContext);

  const handleUpdateStartDate = (pickedDate) => {
    if (!pickedDate) {
      pickedDate = getDateStringFromDate(new Date());
    }
    setDateRange((oldDateRange) => {
      return {
        ...oldDateRange,
        startDate: getDateFromDateString(pickedDate),
      };
    });
  };

  const handleUpdateEndDate = (pickedDate) => {
    if (!pickedDate) {
      pickedDate = getDateStringFromDate(new Date());
    }
    setDateRange((oldDateRange) => {
      return {
        ...oldDateRange,
        endDate: getDateFromDateString(pickedDate),
      };
    });
  };

  const handleAnalysisButtonClick = async (event) => {
    event.preventDefault();
    if (isFetching) return;
    if (dateRange.startDate === "") {
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_ERROR,
        "Please choose a start date",
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
      return;
    } else if (dateRange.startDate > dateRange.endDate) {
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_ERROR,
        "Start date cannot be greater than end date",
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
      return;
    }
    setIsFetching(true);
    const queryParams = new URLSearchParams({
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString(),
    });
    const url = `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV_URL
        : process.env.REACT_APP_BACKEND_PROD_URL
    }/api/v1/query/all?${queryParams.toString()}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      if (parseInt(response.status / 100) !== 2) {
        console.log(data);
        if (response.status === 500)
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }
      console.log(data);
    } catch (err) {
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_ERROR,
        err.message,
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
    }
    setIsFetching(false);
  };

  return (
    <>
      <DatePicker
        title="Start Date"
        pickedDate={dateRange.startDate}
        updatePickedDate={handleUpdateStartDate}
      />
      <DatePicker
        title="End Date"
        pickedDate={dateRange.endDate}
        updatePickedDate={handleUpdateEndDate}
      />
      <div className={styles["submit-button"]}>
        <button onClick={handleAnalysisButtonClick}>Submit</button>
      </div>
      <AllCharts title="Your Charts" />
    </>
  );
};

export default AnalysisCharts;

// 1. Date Filter
//    -> State to track both values
//    -> Ensure non-null and correct values (start date before end date)
//    -> Notification for incorrect values
//    ->
// 2. Create a layout
//    -> CSS to show all the graphs, possibly flex
//    -> Fallback for no data, may need a pre-check call to check if there are documents present in that date
//    ->
// 3. Make the required calls
//    -> Total expense
//    -> Highest Expense
//    -> Highest total expense on date
//    -> Line chart of expenses
//    -> Bar chart of expenses by payment mode
//    -> Expenses range of each mode (what are the minimum and maximum expenses performed by each payment mode) (optional)
// 4. Add state management to display the analysis page
// 5. For future
//    -> Bar chart by tags
//    ->
//    ->
