import { useState } from "react";

import Modal from "./../Modal/Modal";
import styles from "./AddExpense.module.css";

const AddExpense = ({
  pickedDate,
  handleAddExpenseItem,
  handleNotification,
}) => {
  const [showModal, setShowModal] = useState(false);
  const displayModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div className={styles["add-expense"]}>
      <button onClick={displayModal} className={styles["add-expense-button"]}>
        Add New Expense
      </button>
      {showModal && (
        <Modal
          handleHideModal={hideModal}
          pickedDate={pickedDate}
          handleAddExpenseItem={handleAddExpenseItem}
          handleNotification={handleNotification}
        />
      )}
    </div>
  );
};

export default AddExpense;
