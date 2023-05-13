import Button from "../form/Button/Button";
import styles from "./TaskCard.module.css";
import { AiOutlineEdit } from "react-icons/ai";

type TaskCardProps = {
  name: string;
  urgency: string;
  startDate: string;
  endDate: string;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

function TaskCard({
  name,
  urgency,
  startDate,
  endDate,
  handleEditModal,
  isOpen,
}: TaskCardProps) {
  return (
    <div className={styles.taskCard}>
      <p className={styles.taskCardTittle}>{name}</p>
      <div>
        <p>
          <span>Inicio:</span> {startDate}
        </p>
        <p>
          <span>Termino:</span> {endDate}
        </p>
        <p>
          <span>Status:</span> {urgency}
        </p>
        <div className={styles.btn}>
          <Button text="Concluir"></Button>
          <Button
            text="Editar"
            handleEditModal={handleEditModal}
            isOpen={isOpen}
          >
            <AiOutlineEdit />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
