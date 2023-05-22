import { Task } from "../../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { DateFormat } from "../../../utils/DateFormat/DateFormat";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import { useState } from "react";
import _, { find } from "lodash";
import ClickToEdit from "./ClickToEdit/ClickToEdit";
import { MessageProps } from "../../../pages/Home/MyTasks";
import TextArea from "../TextArea/TextArea";

type ModalProps = {
  isOpen: boolean;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  taskProps?: Task;
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({
  isOpen,
  handleEditModal,
  taskProps,
  setUpdateScreen,
  setMessage,
  setNotification,
}: ModalProps) {
  const [endDate, setEndDate] = useState<string>(taskProps?.endDate || "");
  const [urgency, setUrgency] = useState<string>(taskProps?.urgency || "");
  const [name, setName] = useState<string>(taskProps?.name || "");
  const [description, setDescription] = useState<string>(
    taskProps?.description || ""
  );
  const [openEditNameInput, setOpenEditNameInput] = useState<boolean>(false);
  const taskRepository = new TaskRepositoryFake();
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
      if (taskProps?.id) {
        const findTaskInDB = await taskRepository.findById(taskProps.id);
        if (findTaskInDB) {
          const updatedTask: Task = {
            name,
            urgency,
            endDate,
            id: findTaskInDB.id,
            startDate: findTaskInDB.startDate,
            completed: findTaskInDB.completed,
            description,
          };

          const isEqual = _.isEqual(findTaskInDB, updatedTask);
          if (isEqual) {
            handleEditModal(false);
            return;
          }
          await taskRepository.updateTask(updatedTask);
          setUpdateScreen(true);
          handleEditModal(false);
          setMessage({
            text: "Task atualizada com sucesso!",
            type: "success",
          });
          setNotification(true);
        }
      }

      const task = Task.create({
        name,
        description,
        endDate,
        urgency,
      });
      await taskRepository.save(task);
      setUpdateScreen(true);
      handleEditModal(false);
      setMessage({
        text: "Task criada com sucesso!",
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
      setMessage({
        text: err.message,
        type: "error",
      });
      setNotification(true);
    }
  }

  function handleEditNameInput(e: any) {
    switch (e.target.id === "modalTittle") {
      case true: {
        setOpenEditNameInput(true);
        break;
      }
      case false: {
        setOpenEditNameInput(false);
        break;
      }
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      setName(e.target.value);
      setOpenEditNameInput(false);
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
        <div className={styles.modalHeader} onClick={handleEditNameInput}>
          {openEditNameInput ? (
            <ClickToEdit
              previouslyName={name}
              id="modalTittle"
              name="name"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p id="modalTittle" onClick={handleEditNameInput}>
              {name || "New Task"}
            </p>
          )}
        </div>
        <div className={styles.modalBody} onClick={handleEditNameInput}>
          <div>
            <span>Iniciada em: </span>
            {taskProps?.startDate || ""}
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
          <TextArea
            text="Descricão:"
            onChange={handleOnChange}
            placeholder={taskProps?.description || ""}
          />
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
