import { Task } from "../../entities/Task/Task.entity";
import Button from "../form/Button/Button";
import styles from "./TaskCard.module.css";
import { AiOutlineEdit } from "react-icons/ai";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { MessageProps } from "../../pages/Home/MyTasks";
import { useEffect, useState } from "react";
import { TaskAPIRepository } from "../../repositories/Tasks/API/taskRepository.api";

type TaskCardProps = {
  id: string;
  name: string;
  urgency: string;
  startDate: string;
  description: string;
  endDate: string;
  completed: string;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  editTask?: React.Dispatch<React.SetStateAction<Task>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
  mobileTaskList: boolean;
};

function TaskCard({
  id,
  name,
  urgency,
  startDate,
  endDate,
  completed,
  description,
  handleEditModal,
  setUpdateScreen,
  isOpen,
  editTask,
  setNotification,
  setMessage,
  mobileTaskList,
}: TaskCardProps) {
  const db = new TaskAPIRepository();

  const [userEmail, setUserEmail] = useState<string>();

  function OpenModal() {
    if (handleEditModal && isOpen === false) {
      if (editTask) {
        if (userEmail) {
          editTask({
            id,
            name,
            urgency,
            startDate,
            endDate,
            description,
            completed,
            userEmail,
          });
        }
      }
      handleEditModal(true);
    }
  }

  async function handleCompleteTask() {
    try {
      const token = localStorage.getItem("token") || "";
      await db.completeTask(id, token);
      setUpdateScreen(true);
      setMessage({
        text: "Oba, mais uma task finalizada!",
        type: "success",
      });
      setNotification(true);
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        setMessage({
          text: "Ops, nao foi possivel carregar suas tasks agora",
          type: "error",
        });
        setNotification(true);
      }
    }
  }

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div
      className={`${mobileTaskList ? styles.mobileTaskCard : styles.taskCard}`}
      onClick={() => {
        if (mobileTaskList) {
          OpenModal();
        }
      }}
    >
      <p className={styles.taskCardtitle}>{name}</p>
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
        <div className={styles.buttons}>
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
