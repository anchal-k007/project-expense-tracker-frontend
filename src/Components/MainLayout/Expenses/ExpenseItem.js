import styles from "./ExpenseItem.module.css";

const ExpenseItem = (props) => {
  const { amount , paymentMode , reason } = props;
  const date = props.date.toLocaleDateString("en-in", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  console.log(props);
  return (
    <tr className={styles["expense-item"]} >
      <td>{date}</td>
      <td>{amount}</td>
      <td>{paymentMode}</td>
      <td>{reason}</td>
    </tr>
  )
}

export default ExpenseItem;