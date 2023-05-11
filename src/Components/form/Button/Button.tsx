import styles from "./Button.module.css";

type ButtonProps = {
  handleOnClick?: React.MouseEventHandler;
  text: string;
};

function Button({ text, handleOnClick }: ButtonProps) {
  return (
    <>
      <button onClick={handleOnClick} className={styles.btn}>
        {text}
      </button>
    </>
  );
}

export default Button;
