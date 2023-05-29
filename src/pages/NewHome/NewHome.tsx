import { useEffect, useState } from "react";
import BlockCard from "../../Components/BlockCard/BlockCard";
import Clock from "../../Components/layout/Clock/Clock";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import styles from "./NewHome.module.css";
import { Task } from "../../entities/Task/Task.entity";
import { DateFormat } from "../../utils/DateFormat/DateFormat";
import { Link } from "react-router-dom";
import { TaskAPIRepository } from "../../repositories/Tasks/API/taskRepository.api";

function NewHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const dateFormat = new DateFormat();

  function handleMessageOfDay(): string {
    const randomIndex = Math.floor(Math.random() * 5);
    const message = messages[randomIndex];

    return message;
  }

  const messages = [
    "Transforme seus erros em sementes.",
    "Ao acordar pela manhã, pense no precioso privilégio de estar vivo, respirando, pensando, desfrutando e amando.",
    "Há uma força matriz mais poderosa que o vapor, a eletricidade e a energia atômica: a vontade.",
    "É uma força que não tem muito como explicar, capaz de mover montanhas.",
    "É a esperança que não vacila diante das dificuldades e a confiança de que tudo fica bem quando se tem Deus no coração.",
    "O ponto de partida de qualquer realização é o desejo.",
  ];

  async function getTasksInDB() {
    try {
      const userEmail = localStorage.getItem("userEmail") || "";
      const token = localStorage.getItem("token") || "";
      const db = new TaskAPIRepository();
      const tasks = await db.showAllByUserEmail(userEmail, token);
      setTasks(tasks);

      return tasks;
    } catch (err: any) {
      console.log(err.message);
    }
  }

  function getTasksByDate(date: Date | string): Task[] {
    let dateFormated: string;
    if (date instanceof Date) {
      dateFormated = dateFormat.formatNewDate(new Date());
    } else {
      dateFormated = date;
    }
    const tasksByDate = tasks.filter((task) => task.endDate === dateFormated);
    return tasksByDate;
  }

  function expiredTasks() {
    const today = dateFormat.formatNewDate(new Date());
    const expiredTasks = tasks.filter((task) => {
      if (dateFormat.compareDates(task.endDate, today)) {
        return task;
      }
    });
    return expiredTasks;
  }

  function getCompletedTasks() {
    const completedTasks = tasks.filter(
      (task) => task.completed === "Concluida"
    );
    return completedTasks;
  }

  useEffect(() => {
    getTasksInDB();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.helpfulMessages}>
        <Clock />
        <div>
          <div className={styles.messageOfDay}>
            <h3>Mensagem do dia:</h3>
            <p>{handleMessageOfDay()}</p>
          </div>
        </div>
      </section>
      <section className={styles.cardGroup}>
        <Link to="/mytasks" state={{ from: { status: "" } }}>
          <BlockCard
            title="Para hoje:"
            description="Tasks"
            value={getTasksByDate(new Date()).length}
            customClass="blue"
          />
        </Link>
        <BlockCard
          title="Tasks vencidas:"
          description="Tasks"
          value={expiredTasks().length}
          customClass="lightBlue"
        />
        <BlockCard
          title="Já concluidas:"
          description="Tasks"
          value={getCompletedTasks().length}
          customClass="lightBlue"
        />
        <BlockCard
          title="Total:"
          description="Tasks"
          value={tasks.length}
          customClass="blue"
        />
      </section>
    </main>
  );
}

export default NewHome;
