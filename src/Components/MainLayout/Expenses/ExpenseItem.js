import { useState, useContext } from "react";
import Modal from "../Modal/Modal";
import notificationContext from "../../../store/notification_context";
import expensesContext from "../../../store/expenses_context";

import styles from "./ExpenseItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CONSTANTS from "../../../utils/constants";

const ExpenseItem = ({ expenseItem }) => {
  const { amount, paymentMode, tags, reason, _id: expenseId, date } = expenseItem;
  const { handleDeleteExpenseItem } = useContext(expensesContext);
  const { handleNotification } = useContext(notificationContext);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const displayModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };

  const deleteItem = async () => {
    if(isLoading) return;
    setIsLoading(true);
    try {
      // A Date datatype is expected as the second argument
      // All dates are ISO strings, hence we need to convert it
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
        "Deleting Expense...",
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
      await handleDeleteExpenseItem(expenseId, new Date(date));
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
        "Deleted Expense",
        CONSTANTS.NOTIFICATION_TIME_SUCCESS
      );
    } catch (err) {
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_ERROR,
        err.message,
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
    }
    setIsLoading(false);
  };

  return (
    <tr className={styles["expense-item"]}>
      <td>{amount}</td>
      <td>{paymentMode}</td>
      <td>{tags.map(tag => <span key={tag._id} className={styles["tag-name"]}>{tag.name}</span>)}</td>
      <td>{reason}</td>
      <td className={styles.options}>
        <button className={styles["edit-button"]} onClick={displayModal}>
          Edit
        </button>
        <button className={styles["delete-button"]} onClick={deleteItem} disabled={isLoading}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "white", fontSize: "1rem" }}
          />
        </button>
      </td>
      {showModal && (
        <Modal
          handleHideModal={hideModal}
          // All dates of expenses are stored in ISO String format. Need to be converted back to date
          pickedDate={new Date(date)}   
          expenseItemDetails={expenseItem}
        />
      )}
    </tr>
  );
};

export default ExpenseItem;
