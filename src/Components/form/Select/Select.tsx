import styles from "./Select.module.css";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleOnChange: React.ChangeEventHandler;
  name: string;
}

function Select({ handleOnChange, name }: SelectProps) {
  return (
    <div className={styles.select}>
      <label htmlFor={name}>Urgencia:</label>
      <select name={name} onChange={handleOnChange}>
        <option value="Nao urgente">Nao urgente</option>
        <option value="Pouco urgente">Pouco urgente</option>
        <option value="Muito urgente">Muito urgente</option>
      </select>
    </div>
  );
}

export default Select;
