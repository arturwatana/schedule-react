import Button from "../form/Button/Button";
import styles from "./TaskCard.module.css";

function TaskCard() {
  return (
    <div className={styles.taskCard}>
      <p className={styles.taskCardTittle}>Nome da task</p>
      <div>
        <p>
          <span>Inicio:</span> 23/05/2023
        </p>
        <p>
          <span>Termino:</span> 26/05/2023
        </p>
        <p>
          <span>Status:</span> Urgente
        </p>
        <div className={styles.btn}>
          <Button text="Concluir" />
          <Button text="Editar" />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
