import styles from "./TittleModal.module.css";
import { InputHTMLAttributes } from "react";
interface TittleModalProps extends InputHTMLAttributes<HTMLInputElement> {
  previouslyName: string;
}

function TittleModal({ previouslyName, ...rest }: TittleModalProps) {
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

export default TittleModal;
