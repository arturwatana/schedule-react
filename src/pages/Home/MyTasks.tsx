import TaskCard from "../../Components/TaskCard/TaskCard";
import AddTaskForm from "../../Components/form/AddTaskForm";
import Input from "../../Components/form/Input/Input";
import Modal from "../../Components/form/Modal/Modal";
import Select from "../../Components/form/Select/Select";
import Clock from "../../Components/layout/Clock/Clock";
import Loading from "../../Components/layout/Loading/Loading";
import Notification from "../../Components/layout/Notification/Notification";
import { Task } from "../../entities/Task/Task.entity";
import { TaskRepositoryFake } from "../../repositories/Tasks/fakeDB/taskRepository.fakeDB";
import styles from "./MyTasks.module.css";
import { useState, useEffect } from "react";

type StateFilterProps = {
  status: string;
  urgency: string;
};

export type MessageProps = {
  text: string;
  type: "success" | "error";
};

function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task>({
    id: "",
    name: "",
    urgency: "",
    startDate: "",
    endDate: "",
    description: "",
    completed: "Em Andamento",
  });
  const [updateScreen, setUpdateScreen] = useState<boolean>(false);
  const [stateFilter, setStateFilter] = useState<StateFilterProps>({
    status: "Mostrar Todas",
    urgency: "Mostrar Todas",
  });
  const [nameFilter, setNameFilter] = useState<string>();
  const [message, setMessage] = useState<MessageProps>({
    text: "Seja Bem Vindo",
    type: "success",
  });
  const [notification, setNotification] = useState<boolean>(false);

  const taskRepository = async () => {
    try {
      const taskRepository = new TaskRepositoryFake();
      const db = await taskRepository.showAll();
      setTasks(db);
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
  };

  function getUrgencyCategories() {
    if (tasks) {
      const tasksUrgency = tasks?.map((task) => {
        return task.urgency;
      });
      const uniqueUrgencys = [...new Set(tasksUrgency)];
      return uniqueUrgencys.map((categorie) => {
        return (
          <option value={categorie} key={categorie}>
            {categorie}
          </option>
        );
      });
    }
  }

  function createTaskModal() {
    setModalOpen(true);
  }

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
    if (tasks) {
      let filteredTasks = tasks;
      if (nameFilter) {
        filteredTasks = tasks.filter((task) => {
          if (task.name.toLowerCase().includes(nameFilter.toLowerCase())) {
            return task;
          }
        });
      }
      if (
        stateFilter.status === "Mostrar Todas" &&
        stateFilter.urgency === "Mostrar Todas"
      ) {
        const allTasks = filteredTasks
          .map((task) => {
            return (
              <TaskCard
                description={task.description}
                setMessage={setMessage}
                setNotification={setNotification}
                isOpen={modalOpen}
                key={task.id}
                setUpdateScreen={setUpdateScreen}
                handleEditModal={setModalOpen}
                id={task.id}
                name={task.name}
                startDate={task.startDate}
                completed={task.completed}
                endDate={task.endDate}
                urgency={task.urgency}
                editTask={setEditTask}
              />
            );
          })
          .reverse();
        return allTasks;
      }

      if (
        stateFilter.status !== "Mostrar Todas" &&
        stateFilter.urgency !== "Mostrar Todas"
      ) {
        const filterTasksByStatus = filteredTasks.filter((task) => {
          if (
            task.completed === stateFilter.status &&
            task.urgency === stateFilter.urgency
          ) {
            return task;
          }
        });

        const showFilteredTasks = filterTasksByStatus
          .map((task) => {
            return (
              <TaskCard
                description={task.description}
                setMessage={setMessage}
                setNotification={setNotification}
                key={task.id}
                isOpen={modalOpen}
                setUpdateScreen={setUpdateScreen}
                handleEditModal={setModalOpen}
                editTask={setEditTask}
                id={task.id}
                name={task.name}
                startDate={task.startDate}
                completed={task.completed}
                endDate={task.endDate}
                urgency={task.urgency}
              />
            );
          })
          .reverse();
        return showFilteredTasks;
      }

      if (
        stateFilter.status !== "Mostrar Todas" ||
        stateFilter.urgency !== "Mostrar Todas"
      ) {
        const filterTasksByStatus = filteredTasks.filter((task) => {
          if (
            task.completed === stateFilter.status ||
            task.urgency === stateFilter.urgency
          ) {
            return task;
          }
        });

        const showFilteredTasks = filterTasksByStatus
          .map((task) => {
            return (
              <TaskCard
                description={task.description}
                setMessage={setMessage}
                setNotification={setNotification}
                key={task.id}
                isOpen={modalOpen}
                setUpdateScreen={setUpdateScreen}
                handleEditModal={setModalOpen}
                id={task.id}
                name={task.name}
                startDate={task.startDate}
                completed={task.completed}
                endDate={task.endDate}
                urgency={task.urgency}
                editTask={setEditTask}
              />
            );
          })
          .reverse();
        return showFilteredTasks;
      }
    }
  }

  function handleFilterTasks(e: any) {
    switch (e.currentTarget.name) {
      case "filterStatus":
        setStateFilter({ ...stateFilter, status: e.target.value });
        break;
      case "filterUrgency":
        setStateFilter({ ...stateFilter, urgency: e.target.value });
        break;
      case "filterByName":
        setNameFilter(e.target.value);
        break;
    }
  }

  function handleNotification() {
    return <Notification message={message.text} customClass={message.type} />;
  }

  useEffect(() => {
    if (notification) {
      handleNotification();
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    }

    //todo cleanup function
  }, [notification]);

  useEffect(() => {
    if (updateScreen) {
      taskRepository();
      setUpdateScreen(false);
    }
  }, [updateScreen]);

  useEffect(() => {
    taskRepository();
  }, []);

  return (
    <main className={styles.MyTasks}>
      {modalOpen ? (
        <Modal
          setNotification={setNotification}
          setUpdateScreen={setUpdateScreen}
          isOpen={modalOpen}
          handleEditModal={setModalOpen}
          taskProps={editTask}
          setMessage={setMessage}
        />
      ) : null}
      {notification ? handleNotification() : null}
      <section className={styles.today}>
        <div className={styles.header}>
          <Input
            text="Filtrar por nome:"
            onChange={handleFilterTasks}
            name="filterByName"
            customClass="nameFilter"
          />
          <Select
            handleOnChange={handleFilterTasks}
            name="filterStatus"
            text="Filtrar por status:"
            customClass="selectFilter"
          >
            <option value="Mostrar Todas">Mostrar Todas</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluida">Concluida</option>
          </Select>
          <Select
            handleOnChange={handleFilterTasks}
            name="filterUrgency"
            text="Filtrar por urgencia:"
            customClass="selectFilter"
          >
            <option value="Mostrar Todas">Mostrar Todas</option>
            {tasks ? getUrgencyCategories() : null}
          </Select>
        </div>
        <button className={styles.addTaskBtn} onClick={createTaskModal}>
          Adicionar Task
        </button>

        <div className={styles.listCards}>
          {tasks ? renderTasks() : <Loading />}
        </div>
      </section>
      <div className={styles.menu}>
        <Clock />
        <AddTaskForm
          setNotification={setNotification}
          setUpdateScreen={setUpdateScreen}
          setMessage={setMessage}
        />
      </div>
    </main>
  );
}

export default MyTasks;
