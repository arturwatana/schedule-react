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
  const [editTask, setEditTask] = useState<Task>({
    name: "",
    endDate: "",
    id: "",
    startDate: "",
    urgency: "",
    completed: false,
  });
  const [updateScreen, setUpdateScreen] = useState<boolean>(false);

  const taskRepository = () => {
    setTimeout(async () => {
      const taskRepository = new TaskRepositoryFake();
      const db = await taskRepository.showAll();
      setTasks(db);
    }, 500);
  };

  function renderTasks() {
    if (!tasks) {
      return (
        <>
          <Loading />
        </>
      );
    }
    if (tasks.length === 0) {
      return (
        <>
          <p className={styles.zeroTasks}>Oba, nao há tasks para hoje</p>
        </>
      );
    }
    return tasks.map((task) => {
      return (
        <TaskCard
          isOpen={modalOpen}
          setUpdateScreen={setUpdateScreen}
          handleEditModal={setModalOpen}
          id={task.id}
          name={task.name}
          startDate={task.startDate}
          completed={task.completed}
          endDate={task.endDate}
          urgency={task.urgency}
          key={task.id}
          editTask={setEditTask}
        />
      );
    });
  }

  function handleUpdateScreen() {
    if (updateScreen) {
      setUpdateScreen(false);
    }
  }

  useEffect(() => {
    taskRepository();
    handleUpdateScreen();
  }, [updateScreen]);

  return (
    <main className={styles.home}>
      {modalOpen ? (
        <Modal
          setUpdateScreen={setUpdateScreen}
          isOpen={modalOpen}
          handleEditModal={setModalOpen}
          taskProps={editTask}
        />
      ) : null}
      <section className={styles.today}>
        <p className={styles.todayTittle}>Para hoje, temos:</p>
        <div className={styles.listCards}>
          {tasks ? renderTasks() : <Loading />}
        </div>
      </section>
      <div className={styles.menu}>
        <TimeCounter />
        <AddTaskForm setUpdateScreen={setUpdateScreen} />
      </div>
    </main>
  );
}

export default Home;
