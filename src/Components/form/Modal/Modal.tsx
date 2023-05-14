import { Task } from "../../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { TaskRepository } from "../../../repositories/Tasks/memory/taskRepository.memory";
import { DateFormat } from "../../../utils/DateFormat/DateFormat";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./Modal.module.css";
import { useState } from "react";
import _, { find } from "lodash";
import TittleModal from "./tittleModal/TittleModal";

type ModalProps = {
  isOpen: boolean;
  handleEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  taskProps: Task;
};

function Modal({
  isOpen,
  handleEditModal,
  taskProps,
  setUpdateScreen,
}: ModalProps) {
  const [endDate, setEndDate] = useState<string>(taskProps.endDate);
  const [urgency, setUrgency] = useState<string>(taskProps.urgency);
  const [name, setName] = useState<string>(taskProps.name);
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
    }
  }

  async function editTaskInDB() {
    const findTaskInDB = await taskRepository.findById(taskProps.id);
    if (findTaskInDB) {
      const updatedTask = {
        name,
        urgency,
        endDate,
        id: findTaskInDB.id,
        startDate: findTaskInDB.startDate,
        completed: findTaskInDB.completed,
      };

      const isEqual = _.isEqual(findTaskInDB, updatedTask);
      if (isEqual) {
        handleEditModal(false);
        return;
      }
      const updatedTaskInDB = await taskRepository.updateTask(updatedTask);
      setUpdateScreen(true);
      handleEditModal(false);
    }
  }

  function closeModal() {
    handleEditModal(false);
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
      <div className={styles.fadeIn} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader} onClick={handleEditNameInput}>
          {openEditNameInput ? (
            <TittleModal
              previouslyName={name}
              id="modalTittle"
              name="name"
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p id="modalTittle" onClick={handleEditNameInput}>
              {name}
            </p>
          )}
        </div>
        <div className={styles.modalBody} onClick={handleEditNameInput}>
          <div>
            <span>Iniciada em: </span>
            {taskProps.startDate}
          </div>
          <Input
            name="endDate"
            type="date"
            text="Data de termino:"
            placeholder={taskProps.endDate}
            onChange={handleOnChange}
          />
          <Input
            name="urgency"
            type="text"
            text="Urgencia:"
            placeholder={taskProps.urgency}
            onChange={handleOnChange}
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
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
