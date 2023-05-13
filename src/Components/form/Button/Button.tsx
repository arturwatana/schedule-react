import { Dispatch, SetStateAction } from "react";
import styles from "./Button.module.css";
import { Task } from "../../../entities/Task/Task.entity";

type ButtonProps = {
  handleEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  text: string;
  isOpen?: boolean;
  customClass?: string;
};

function Button({
  text,
  children,
  handleEditModal,
  isOpen,
  customClass,
}: ButtonProps) {
  function handleOnClick() {
    if (handleEditModal) {
      switch (isOpen) {
        case true:
          handleEditModal(false);
          break;
        case false:
          handleEditModal(true);
          break;
      }
    }
  }

  return (
    <>
      <button
        onClick={handleOnClick}
        className={`${styles.btn} ${styles[customClass ? customClass : 0]}`}
      >
        {children} {text}
      </button>
    </>
  );
}

export default Button;
