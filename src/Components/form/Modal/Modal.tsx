import Button from "../Button/Button";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ isOpen, handleEditModal }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div className={styles.fadeIn}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p>Modal header</p>
          <Button
            text="Fechar"
            handleEditModal={handleEditModal}
            customClass="modalBtn"
            isOpen={true}
          />
        </div>
        <div className={styles.modalBody}>Loren ipasdias,dasd</div>
      </div>
    </div>
  );
}

export default Modal;
