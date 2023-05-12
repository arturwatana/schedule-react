import TaskCard from "../../Components/TaskCard/TaskCard";
import TimeCounter from "../../Components/TimeCounter/TimeCounter";
import AddTaskForm from "../../Components/form/AddTaskForm";
import { AddTaskToDB } from "../../Task/useCases/AddTaskToDB.usecase";
import { Task } from "../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import { TaskRepository } from "../../repositories/Tasks/memory/taskRepository.memory";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const taskRepository = async () => {
    const taskRepository = new TaskRepositoryFake();

    console.log(taskRepository);
    const tasksInDB = await taskRepository.showAll();
    setTasks(tasksInDB);
  };
  useEffect(() => {
    taskRepository();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <main className={styles.home}>
      <section className={styles.today}>
        <p className={styles.todayTittle}>Para hoje, temos:</p>
        <div className={styles.listCards}>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <TaskCard
                  name={task.name}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  urgency={task.urgency}
                  key={task.name}
                />
              );
            })
          ) : (
            <p>Oba, nao temos nenhuma task para hoje</p>
          )}
        </div>
      </section>
      <div className={styles.menu}>
        <TimeCounter />
        <AddTaskForm />
      </div>
    </main>
  );
}

export default Home;
