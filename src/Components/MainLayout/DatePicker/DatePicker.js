import styles from "./DatePicker.module.css";

const DatePicker = () => {
  return (
    <div className={styles["date-picker"]}>
      <label for="date-picker">Choose A Date</label>
      <input type="date" name="date-picker"></input>
    </div>
  );
};

export default DatePicker;