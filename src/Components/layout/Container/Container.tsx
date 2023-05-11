import styles from "./Container.module.css";

type ContainerProps = {
  children: React.ReactNode;
  customClass?: string;
};

function Container({ children, customClass }: ContainerProps) {
  return (
    <div className={`${styles.container} ${styles[customClass || ""]}`}>
      {children}
    </div>
  );
}

export default Container;
