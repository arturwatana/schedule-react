import Input from "./Input/Input";
import Select from "./Select/Select";
import styles from "./AddTaskForm.module.css";
import Button from "./Button/Button";
import { useState } from "react";
import { Task } from "../../entities/Task/Task.entity";
import { AddTaskToDB } from "../../Task/useCases/AddTaskToDB.usecase";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";

function AddTaskForm() {
  const [endDate, setEndDate] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [name, setName] = useState<string>("");

  function handleOnChange(e: any) {
    switch (e.currentTarget.name) {
      case "name":
        setName(e.currentTarget.value);
        break;
      case "endDate":
        setEndDate(e.currentTarget.value);
        break;
      case "taskCategory":
        setUrgency(e.currentTarget.value);
        break;
    }
  }

  async function handleOnSubmit(e: any) {
    e.preventDefault();
    try {
      const taskRepository = new TaskRepositoryFake();
      const taskCreated = Task.create({ name, endDate, urgency });
      const addTaskToDB = new AddTaskToDB(taskRepository);
      await addTaskToDB.execute(taskCreated);
      console.log("criada");
    } catch (err: any) {
      console.log(err.message);
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
        />
        <Select handleOnChange={handleOnChange} name="taskCategory" />
        <Input
          name="endDate"
          placeholder="ola"
          text="Termino:"
          type="date"
          onChange={handleOnChange}
        />
        <Button text="Salvar Task" />
      </form>
    </div>
  );
}

export default AddTaskForm;
