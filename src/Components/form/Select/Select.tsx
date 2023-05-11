import styles from "./Select.module.css";

function Select() {
  return (
    <div className={styles.select}>
      <label htmlFor="selectUrgency">Urgencia:</label>
      <select name="selectUrgency">
        <option value="Nao urgente">Nao urgente</option>
        <option value="Pouco urgente">Pouco urgente</option>
        <option value="Muito urgente">Muito urgente</option>
      </select>
    </div>
  );
}

export default Select;
