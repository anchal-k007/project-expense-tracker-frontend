import styles from "./DatePicker.module.css";
import { getDateStringFromDate } from "../../../utils/convertDateFormat";

const DatePicker = ({ title, pickedDate, updatePickedDate }) => {
  const dateString = getDateStringFromDate(pickedDate);

  const changePickedDate = (event) => {
    updatePickedDate(event.target.value);
  };

  return (
    <div className={styles["date-picker"]}>
      <label htmlFor="date-picker">{title}</label>
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
