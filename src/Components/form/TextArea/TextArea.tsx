import { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  text: string;
}

function TextArea({ text, ...rest }: TextAreaProps) {
  return (
    <div className={styles.textArea}>
      <p>{text}</p>
      <textarea
        onChange={rest.onChange}
        name="description"
        placeholder={rest.placeholder}
      ></textarea>
    </div>
  );
}

export default TextArea;
