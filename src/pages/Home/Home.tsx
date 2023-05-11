import TaskCard from "../../Components/TaskCard/TaskCard";
import TimeCounter from "../../Components/TimeCounter/TimeCounter";
import AddTaskForm from "../../Components/form/AddTaskForm";
import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.today}>
        <p className={styles.todayTittle}>Para hoje, temos</p>
        <div className={styles.listCards}>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
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
