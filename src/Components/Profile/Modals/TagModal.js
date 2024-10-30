import { createPortal } from "react-dom";
import TagForm from "./../Forms/TagForm";
import styles from "./TagModal.module.css";

const ModalBackground = ({ handleHideModal, children }) => {
  return (
    <div className={styles["modal-background"]} onClick={handleHideModal}>
      {children}
    </div>
  );
};

const TagModal = ({ handleHideModal, tagDetails }) => {
  const modalDomElement = document.getElementById("modal");
  return (
    <>
      {createPortal(
        <ModalBackground handleHideModal={handleHideModal} />,
        modalDomElement
      )}
      {createPortal(
        <TagForm
          handleOnCancel={handleHideModal}
          tagDetails={tagDetails}
        />,
        modalDomElement
      )}
    </>
  );
};

export default TagModal;
