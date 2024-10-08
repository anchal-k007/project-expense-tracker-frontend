import styles from "./DatePicker.module.css";
import { getDateStringFromDate } from "../../../utils/convertDateFormat";

const DatePicker = ({ pickedDate, updatePickedDate }) => {
  const dateString = getDateStringFromDate(pickedDate);

  const changePickedDate = (event) => {
    updatePickedDate(event.target.value);
  };

  return (
    <div className={styles["date-picker"]}>
      <label htmlFor="date-picker">Choose A Date</label>
      <input
        type="date"
        name="date-picker"
        value={dateString}
        onChange={changePickedDate}
      ></input>
    </div>
  );
};

export default DatePicker;
