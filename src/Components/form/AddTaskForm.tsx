import Input from "./Input/Input";
import Select from "./Select/Select";
import styles from "./AddTaskForm.module.css";
import Button from "./Button/Button";
import { useState } from "react";
import { Task } from "../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { DateFormat } from "../../utils/DateFormat/DateFormat";
import { MessageProps } from "../../pages/Home/MyTasks";

interface AddTaskFormProps {
  setUpdateScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<MessageProps>>;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTaskForm({
  setUpdateScreen,
  setMessage,
  setNotification,
}: AddTaskFormProps) {
  const [endDate, setEndDate] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [name, setName] = useState<string>("");

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
      case "taskCategory":
        setUrgency(e.currentTarget.value);
        break;
    }
  }

  async function handleOnSubmit(e: any) {
    e.preventDefault();
    try {
      const dateFormat = new DateFormat();
      const newDate = dateFormat.formatNewDate(new Date());
      if (dateFormat.compareDates(endDate, newDate)) {
        setMessage({
          text: "Ops, essa task está para o passado!",
          type: "error",
        });
        setNotification(true);
        return;
      }
      const taskRepository = new TaskRepositoryFake();
      const taskCreated = Task.create({
        name,
        endDate,
        urgency,
        description: "",
      });
      await taskRepository.save(taskCreated);
      setUpdateScreen(true);
      setMessage({
        text: "Task Criada com sucesso!",
        type: "success",
      });
      setNotification(true);
    } catch (err: any) {
      if (err.message === "Error: TypeError: Failed to fetch") {
        setMessage({
          text: "Ops, nao foi possivel carregar suas tasks agora",
          type: "error",
        });
        setNotification(true);
      }
    }
  }

  return (
    <div className={styles.addTaskForm}>
      <p>Adicione uma task</p>
      <form onSubmit={handleOnSubmit}>
        <Input
          name="name"
          placeholder="Lavar louca"
          text="Nome:"
          type="text"
          onChange={handleOnChange}
          customClass="formInput"
        />
        <Select
          handleOnChange={handleOnChange}
          name="taskCategory"
          text="Urgencia:"
        >
          <option value="Nao Urgente">Nao urgente</option>
          <option value="Pouco Urgente">Pouco urgente</option>
          <option value="Muito Urgente">Muito urgente</option>
        </Select>
        <Input
          name="endDate"
          placeholder="20/05/2023"
          text="Termino:"
          type="date"
          onChange={handleOnChange}
          customClass="formInput"
        />
        <Button text="Salvar Task" />
      </form>
    </div>
  );
}

export default AddTaskForm;
