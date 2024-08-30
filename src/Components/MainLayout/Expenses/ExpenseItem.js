import styles from "./ExpenseItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpenseItem = (props) => {
  const { amount , paymentMode , reason } = props;
  const date = props.date.toLocaleDateString("en-in", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  return (
    <tr className={styles["expense-item"]} >
      <td>{date}</td>
      <td>{amount}</td>
      <td>{paymentMode}</td>
      <td>{reason}</td>
      <td className={styles.options}>
        <button className={styles["edit-button"]} >Edit</button>
        <button className={styles["delete-button"]}><FontAwesomeIcon icon={faTrash} style={{color: "white", fontSize: "1rem"}}/></button>
      </td>
    </tr>
  )
}

export default ExpenseItem;