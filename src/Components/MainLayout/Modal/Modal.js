import { createPortal } from "react-dom";
import ExpenseForm from "./ExpenseForm";

import styles from "./Modal.module.css";

const ModalBackground = ({ handleHideModal, children }) => {
  return (
    <div className={styles["modal-background"]} onClick={handleHideModal}>
      {children}
    </div>
  );
};

const Modal = ({
  handleHideModal,
  pickedDate,
  handleAddExpenseItem,
  expenseItemDetails,
  handleUpdateExpenseItem,
  handleNotification,
}) => {
  const modalDomElement = document.getElementById("modal");
  return (
    <>
      {createPortal(
        <ModalBackground handleHideModal={handleHideModal} />,
        modalDomElement
      )}
      {createPortal(
        <ExpenseForm
          handleOnCancel={handleHideModal}
          pickedDate={pickedDate}
          handleAddExpenseItem={handleAddExpenseItem}
          expenseItemDetails={expenseItemDetails}
          handleUpdateExpenseItem={handleUpdateExpenseItem}
          handleNotification={handleNotification}
        />,
        modalDomElement
      )}
    </>
  );
};

export default Modal;
