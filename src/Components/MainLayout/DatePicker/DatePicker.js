import { useEffect , useRef } from "react";

import styles from "./DatePicker.module.css";

const DatePicker = () => {
  const datePickerRef = useRef();
  // TODO: Set date picker as current date
  // Problem: With this, changing the date is not working
  // useEffect(() => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() >= 10 ? today.getMonth() : "0" + today.getMonth();
  //   const date = today.getDate();
  //   const dateString = `${year}-${month}-${date}`;
  //   console.log(dateString);
  //   datePickerRef.current.value = dateString;
  // }, []);

  return (
    <div className={styles["date-picker"]}>
      <label htmlFor="date-picker">Choose A Date</label>
      <input type="date" name="date-picker" value={new Date(2024, 7, 1)} ref={datePickerRef}></input>
    </div>
  );
};

export default DatePicker;