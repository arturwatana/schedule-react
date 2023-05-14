import styles from "./Button.module.css";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text: string;
  customClass?: string | string[];
}

function Button({ text, children, customClass, ...rest }: ButtonProps) {
  let customClassIterator;
  if (Array.isArray(customClass)) {
    customClassIterator = customClass
      .map((custom) => `${styles[custom]}`)
      .join(" ");
  }

  if (customClass) {
    if (typeof customClass === "string") {
      customClassIterator = customClass;
    }
  }

  return (
    <>
      <button
        onClick={rest.onClick}
        className={`${styles.btn} ${customClassIterator} `}
      >
        {children} {text}
      </button>
    </>
  );
}

export default Button;
