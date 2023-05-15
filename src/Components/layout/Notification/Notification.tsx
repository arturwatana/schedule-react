import styles from "./Notification.module.css";

type NotificationProps = {
  message: string;
  customClass?: string;
};

function Notification({ message, customClass }: NotificationProps) {
  return (
    <div className={styles.notificationContainer}>
      <div className={`${styles.notification} ${styles[customClass || ""]}`}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Notification;
