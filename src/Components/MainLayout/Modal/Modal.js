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
  addExpenseItem,
  expenseItemDetails,
  updateExpenseItem,
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
          addExpenseItem={addExpenseItem}
          expenseItemDetails={expenseItemDetails}
          updateExpenseItem={updateExpenseItem}
        />,
        modalDomElement
      )}
    </>
  );
};

export default Modal;
