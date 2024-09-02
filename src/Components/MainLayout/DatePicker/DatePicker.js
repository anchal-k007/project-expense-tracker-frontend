import { useEffect , useRef } from "react";

import styles from "./DatePicker.module.css";
import { getDateStringFromDate } from "../../../utils/convertDateFormat";

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