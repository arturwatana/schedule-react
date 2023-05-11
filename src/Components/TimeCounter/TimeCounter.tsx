import styles from "./TimeCounter.module.css";

function TimeCounter() {
  return (
    <div className={styles.timer}>
      <p>17/10/2023</p>
      <p>quarta-feira, 10 de maio de 2023</p>
      <p>17:45:00</p>
    </div>
  );
}

export default TimeCounter;
