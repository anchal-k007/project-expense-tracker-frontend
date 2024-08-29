import { useEffect , useRef } from "react";

import styles from "./DatePicker.module.css";

/**
 * Converts a JS Date to string accepted by HTML date input.
 *  
 * Month in JS is indexed from 0, whereas HTML date input begins from 1.
 * 
 * HTML date input has a strict input type of yyyy-MM-dd
 * @param {Date} today 
 * @returns {String}
 */
function getDateStringFromDate(today) {
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  if(month < 10) {
    month = "0" + month;
  }
  const date = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
  const dateString = `${year}-${month}-${date}`;
  return dateString
}

const DatePicker = (props) => {
  const { pickedDate , updatePickedDate } = props;
  const datePickerRef = useRef();
  const dateString = getDateStringFromDate(pickedDate);

  const changePickedDate = (event) => {
    updatePickedDate(event.target.value);
  }

  return (
    <div className={styles["date-picker"]}>
      <label htmlFor="date-picker">Choose A Date</label>
      <input type="date" name="date-picker" value={dateString} ref={datePickerRef} onChange={changePickedDate}></input>
    </div>
  );
};

export default DatePicker;