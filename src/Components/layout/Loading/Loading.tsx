import { AiOutlineLoading } from "react-icons/ai";
import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loader}>
      <AiOutlineLoading />
    </div>
  );
}

export default Loading;
