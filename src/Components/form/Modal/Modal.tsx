import { Task } from "../../../entities/Task/Task.entity";
import { DateFormat } from "../../../utils/DateFormat/DateFormat";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import { useState } from "react";
import _ from "lodash";
import ClickToEdit from "./ClickToEdit/ClickToEdit";
import { MessageProps } from "../../../pages/Home/MyTasks";
import { TaskAPIRepository } from "../../../repositories/Tasks/API/taskRepository.api";

type ModalProps = {
  isOpen: boolean;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  taskProps?: Task;
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTask: React.Dispatch<React.SetStateAction<Task>>;
};

function Modal({
  isOpen,
  handleEditModal,
  taskProps,
  setUpdateScreen,
  setMessage,
  setNotification,
  setEditTask,
}: ModalProps) {
  const [endDate, setEndDate] = useState<string>(taskProps?.endDate || "");
  const [urgency, setUrgency] = useState<string>(taskProps?.urgency || "");
  const [name, setName] = useState<string>(taskProps?.name || "");
  const [description, setDescription] = useState<string>(
    taskProps?.description || ""
  );
  const [openEditNameInput, setOpenEditNameInput] = useState<boolean>(false);
  const [openEditDescriptionInput, setOpenEditDescriptionInput] =
    useState<boolean>(false);
  const taskRepository = new TaskAPIRepository();
  const dateFormat = new DateFormat();
  if (!isOpen) {
    return null;
  }

  function handleOnChange(e: any) {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "endDate":
        const dateFormat = new DateFormat();
        const endDateFormated = dateFormat.endDateFormat(e.currentTarget.value);
        setEndDate(endDateFormated);
        break;
      case "urgency":
        setUrgency(e.currentTarget.value);
        break;
      case "description":
        setDescription(e.currentTarget.value);
        break;
    }
  }

  async function editTaskInDB() {
    try {
      const token = localStorage.getItem("token") || "";
      const userEmail = localStorage.getItem("userEmail") || "";
      if (taskProps?.id) {
        const findTaskInDB = await taskRepository.findById(
          taskProps.id,
          token || ""
        );
        if (findTaskInDB) {
          const updatedTask: Task = {
            name,
            urgency,
            endDate,
            id: taskProps.id,
            startDate: taskProps.startDate,
            completed: taskProps.completed,
            description,
          };
          const isEqual = _.isEqual(findTaskInDB, updatedTask);
          if (isEqual) {
            handleEditModal(false);
            return;
          }
          await taskRepository.updateTask(updatedTask, token || "");
          setUpdateScreen(true);
          handleEditModal(false);
          setMessage({
            text: "Task atualizada com sucesso!",
            type: "success",
          });
          setNotification(true);
          setEditTask({
            id: "",
            name: "",
            urgency: "",
            startDate: "",
            endDate: "",
            description: "",
            completed: "Em Andamento",
            userEmail: "",
          });
          return;
        }
      }

      const task = Task.create({
        name,
        description,
        endDate,
        urgency,
        userEmail,
      });
      await taskRepository.save(task, token);
      setUpdateScreen(true);
      handleEditModal(false);
      setMessage({
        text: "Task criada com sucesso!",
        type: "success",
      });
      setNotification(true);
      setEditTask({
        id: "",
        name: "",
        urgency: "",
        startDate: "",
        endDate: "",
        description: "",
        completed: "Em Andamento",
        userEmail: "",
      });
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        setMessage({
          text: "Ops, nao foi possivel carregar suas tasks agora",
          type: "error",
        });
        setNotification(true);
      }
      setMessage({
        text: err.message,
        type: "error",
      });
      setNotification(true);
    }
  }

  async function deleteTask() {
    if (taskProps?.id) {
      const token = localStorage.getItem("token") || "";
      const deletedTask = await taskRepository.deleteTask(taskProps.id, token);
      setUpdateScreen(true);
      handleEditModal(false);
      setMessage({
        text: deletedTask,
        type: "success",
      });
      setNotification(true);
      setEditTask({
        id: "",
        name: "",
        urgency: "",
        startDate: "",
        endDate: "",
        description: "",
        completed: "Em Andamento",
        userEmail: "",
      });
    }
  }

  function handleEditInput(e: any) {
    switch (e.target.id) {
      case "modalTitle": {
        setOpenEditNameInput(true);
        break;
      }
      case "taskDescription": {
        setOpenEditDescriptionInput(true);
        break;
      }
      default: {
        setOpenEditDescriptionInput(false);
        setOpenEditNameInput(false);
      }
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "name":
          setName(e.target.value);
          setOpenEditNameInput(false);
          break;

        case "description":
          setDescription(e.target.value);
          setOpenEditDescriptionInput(false);
      }
    }
  }

  const buttonClasses = ["modalBtn", "margin"];

  return (
    <div>
      <div
        className={styles.fadeIn}
        onClick={() => handleEditModal(false)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader} onClick={handleEditInput}>
          {openEditNameInput ? (
            <ClickToEdit
              previouslyName={name}
              id="modalTitle"
              name="name"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p id="modalTitle" onClick={handleEditInput}>
              {name || "New Task"}
            </p>
          )}
        </div>
        <div className={styles.modalBody} onClick={handleEditInput}>
          <div className={styles.deleteTask}>
            <p>
              <span>Iniciada em: </span>
              {taskProps?.startDate || dateFormat.formatNewDate(new Date())}
            </p>
            <button onClick={deleteTask}>Excluir Task</button>
          </div>
          <Input
            name="endDate"
            type="date"
            text="Data de termino:"
            placeholder={taskProps?.endDate || ""}
            onChange={handleOnChange}
          />
          <Input
            name="urgency"
            type="text"
            text="Urgencia:"
            placeholder={taskProps?.urgency || ""}
            onChange={handleOnChange}
          />
          <div className={styles.description} onClick={handleEditInput}>
            {openEditDescriptionInput ? (
              <ClickToEdit
                previouslyName={description}
                id="taskDescription"
                name="description"
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                customClass="descriptionInput"
              />
            ) : (
              <p id="taskDescription" onClick={handleEditInput}>
                {description
                  ? description
                  : "Escreva uma descricao para a sua task clicando aqui!"}
              </p>
            )}
          </div>
        </div>
        <div className={styles.btn}>
          <Button
            text="Salvar"
            customClass={buttonClasses}
            onClick={editTaskInDB}
          />
          <Button
            text="Fechar"
            customClass={buttonClasses}
            onClick={() => handleEditModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
