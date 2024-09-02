import { createPortal } from "react-dom";
import ExpenseForm from "./ExpenseForm";

import styles from "./Modal.module.css";

const ModalBackground = ({handleHideModal , children}) => {
  return (
    <div className={styles["modal-background"]} onClick={handleHideModal}>
      {children}
    </div>
  )
}

const Modal = ({ handleHideModal }) => {
  const modalDomElement = document.getElementById("modal");
  return (
    <>
      {createPortal(<ModalBackground handleHideModal={handleHideModal}/>, modalDomElement)}
      {createPortal(<ExpenseForm handleOnCancel={handleHideModal}/>, modalDomElement)}
    </>
  );
}

export default Modal;