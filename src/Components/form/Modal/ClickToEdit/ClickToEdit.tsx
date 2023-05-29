import styles from "./ClickToEdit.module.css";
import { InputHTMLAttributes } from "react";
interface ClickToEditProps extends InputHTMLAttributes<HTMLInputElement> {
  previouslyName: string;
  customClass?: string;
}

function ClickToEdit({
  previouslyName,
  customClass,
  ...rest
}: ClickToEditProps) {
  return (
    <>
      <input
        type="text"
        placeholder={previouslyName}
        {...rest}
        className={`${styles.input} ${styles[customClass || ""]}`}
      />
    </>
  );
}

export default ClickToEdit;
