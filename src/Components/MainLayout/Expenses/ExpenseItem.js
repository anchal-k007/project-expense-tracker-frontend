import { useState } from "react";
import Modal from "../Modal/Modal";

import styles from "./ExpenseItem.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExpenseItem = ({
  expenseItem,
  deleteItemFromList,
  updateExpenseItem,
}) => {
  const [showModal, setShowModal] = useState(false);
  const displayModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  const { amount, paymentMode, reason, paymentId, date } = expenseItem;
  const deleteItem = () => {
    deleteItemFromList(paymentId);
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
          updateExpenseItem={updateExpenseItem}
        />
      )}
    </tr>
  );
};

export default ExpenseItem;
