import TaskCard from "../../Components/TaskCard/TaskCard";
import TimeCounter from "../../Components/TimeCounter/TimeCounter";
import AddTaskForm from "../../Components/form/AddTaskForm";
import Modal from "../../Components/form/Modal/Modal";
import Loading from "../../Components/layout/Loading/Loading";
import { Task } from "../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

function Home() {
  const [tasks, setTasks] = useState<Task[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const taskRepository = async () => {
    const taskRepository = new TaskRepositoryFake();
    const tasksInDB = await taskRepository.showAll();
    return tasksInDB;
  };
  const getTasks = async () => {
    const tasksInDB = await taskRepository();
    setTasks(tasksInDB);
  };
  useEffect(() => {
    setTimeout(() => {
      getTasks();
    }, 1000);
  }, []);

  return (
    <main className={styles.home}>
      {modalOpen ? (
        <Modal isOpen={modalOpen} handleEditModal={setModalOpen} />
      ) : null}
      <section className={styles.today}>
        <p className={styles.todayTittle}>Para hoje, temos:</p>
        <div className={styles.listCards}>
          {tasks ? (
            tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <TaskCard
                    isOpen={modalOpen}
                    handleEditModal={setModalOpen}
                    name={task.name}
                    startDate={task.startDate}
                    endDate={task.endDate}
                    urgency={task.urgency}
                    key={task.id}
                  />
                );
              })
            ) : (
              <p>Oba, nao há tasks para hoje</p>
            )
          ) : (
            <Loading />
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
