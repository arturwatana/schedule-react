import styles from "./Button.module.css";

type ButtonProps = {
  handleOnClick?: React.MouseEventHandler;
  children?: React.ReactNode;
  text: string;
};

function Button({ text, children, handleOnClick }: ButtonProps) {
  return (
    <>
      <button onClick={handleOnClick} className={styles.btn}>
        {children} {text}
      </button>
    </>
  );
}

export default Button;
