import Input from "./Input/Input";
import Select from "./Select/Select";
import styles from "./AddTaskForm.module.css";
import Button from "./Button/Button";

function AddTaskForm() {
  return (
    <div className={styles.addTaskForm}>
      <p>Adicione uma task</p>
      <form>
        <Input name="name" placeholder="Lavar louca" text="Nome:" type="text" />
        <Select />
        <Input
          name="name"
          placeholder="Lavar louca"
          text="Termino:"
          type="date"
        />
        <Button text="Salvar Task" />
      </form>
    </div>
  );
}

export default AddTaskForm;
