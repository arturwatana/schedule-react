import styles from "./ContainerForm.module.css";
type ContainerProps = {
  children: React.ReactNode;
};

function ContainerForm({ children }: ContainerProps) {
  return <form className={styles.containerForm}>{children}</form>;
}

export default ContainerForm;
