import { Task } from "../../entities/Task/Task.entity";
import Button from "../form/Button/Button";
import styles from "./TaskCard.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { MessageProps } from "../../pages/Home/Home";

type TaskCardProps = {
  id: string;
  name: string;
  urgency: string;
  startDate: string;
  endDate: string;
  completed: string;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  editTask?: React.Dispatch<React.SetStateAction<Task>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
};

function TaskCard({
  id,
  name,
  urgency,
  startDate,
  endDate,
  completed,
  handleEditModal,
  setUpdateScreen,
  isOpen,
  editTask,
  setNotification,
  setMessage,
}: TaskCardProps) {
  const db = new TaskRepositoryFake();

  function OpenModal() {
    if (handleEditModal && isOpen === false) {
      if (editTask) {
        editTask({
          id: id,
          name: name,
          startDate: startDate,
          endDate: endDate,
          urgency: urgency,
          completed: completed,
        });
      }
      handleEditModal(true);
    }
  }

  async function handleCompleteTask() {
    const taskInDB = await db.findById(id);
    if (taskInDB && taskInDB.completed === "Em Andamento") {
      taskInDB.completed = "Concluida";
      db.updateTask(taskInDB);
      setUpdateScreen(true);
      setMessage({
        text: "Oba, mais uma task finalizada!",
        type: "success",
      });
      setNotification(true);
    }
  }
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
          <span>Urgencia:</span> {urgency}
        </p>
        <p>
          <span>Status:</span> {completed}
        </p>
        <div className={styles.btn}>
          <Button text="Concluir" onClick={handleCompleteTask}></Button>
          <Button text="Editar" onClick={OpenModal}>
            <AiOutlineEdit />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
