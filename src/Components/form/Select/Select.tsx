import styles from "./Select.module.css";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleOnChange: React.ChangeEventHandler;
  name: string;
  children: React.ReactNode;
  text: string;
  customClass?: string;
}

function Select({
  handleOnChange,
  name,
  children,
  text,
  customClass,
}: SelectProps) {
  return (
    <div className={`${styles.select} ${styles[customClass || ""]}`}>
      <label htmlFor={name}>{text}</label>
      <select name={name} onChange={handleOnChange}>
        {children}
      </select>
    </div>
  );
}

export default Select;
