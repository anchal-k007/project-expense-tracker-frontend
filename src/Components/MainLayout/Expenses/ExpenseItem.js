import { useState , useContext } from "react";
import Modal from "../Modal/Modal";
import notificationContext from "../../../store/notification_context";

import styles from "./ExpenseItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CONSTANTS from "../../../utils/constants";

const ExpenseItem = ({
  expenseItem,
  handleDeleteItemFromList,
  handleUpdateExpenseItem,
}) => {
  const { handleNotification } = useContext(notificationContext);
  const [showModal, setShowModal] = useState(false);
  const displayModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const { amount, paymentMode, reason, paymentId, date } = expenseItem;
  const deleteItem = () => {
    handleDeleteItemFromList(paymentId);
    handleNotification(
      CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
      "Deleted Expense",
      CONSTANTS.NOTIFICATION_TIME_SUCCESS
    );
  };

  return (
    <tr className={styles["expense-item"]}>
      <td>{amount}</td>
      <td>{paymentMode}</td>
      <td>{reason}</td>
      <td className={styles.options}>
        <button className={styles["edit-button"]} onClick={displayModal}>
          Edit
        </button>
        <button className={styles["delete-button"]} onClick={deleteItem}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "white", fontSize: "1rem" }}
          />
        </button>
      </td>
      {showModal && (
        <Modal
          handleHideModal={hideModal}
          pickedDate={date}
          expenseItemDetails={expenseItem}
          handleUpdateExpenseItem={handleUpdateExpenseItem}
        />
      )}
    </tr>
  );
};

export default ExpenseItem;
