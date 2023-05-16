import styles from "./Input.module.css";
import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  customClass?: string;
}

function Input({ text, customClass, ...rest }: InputProps) {
  return (
    <div className={` ${styles[customClass || ""]}`}>
      <label htmlFor={rest.name} className={`${styles.label} `}>
        {text}
      </label>

      <input
        className={`${styles.input}`}
        id={rest.name}
        key={rest.name}
        {...rest}
      />
    </div>
  );
}

export default Input;
