import styles from "./Input.module.css";

type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  text: string;
  handleOnChange?: React.ChangeEventHandler;
};

function Input({ type, text, placeholder, name, handleOnChange }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {text}
      </label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        id={name}
        key={name}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default Input;
