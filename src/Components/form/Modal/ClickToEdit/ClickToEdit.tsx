import styles from "./ClickToEdit.module.css";
import { InputHTMLAttributes } from "react";
interface ClickToEditProps extends InputHTMLAttributes<HTMLInputElement> {
  previouslyName: string;
}

function ClickToEdit({ previouslyName, ...rest }: ClickToEditProps) {
  return (
    <>
      <input
        type="text"
        placeholder={previouslyName}
        {...rest}
        className={styles.input}
      />
    </>
  );
}

export default ClickToEdit;
