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

const Modal = ({ handleHideModal , pickedDate }) => {
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
        />,
        modalDomElement
      )}
    </>
  );
};

export default Modal;
