import { Link, redirect } from "react-router-dom";
import ContainerForm from "../../Components/ContainerForm/ContainerForm";
import Button from "../../Components/form/Button/Button";
import Input from "../../Components/form/Input/Input";
import styles from "./Register.module.css";
import { useState } from "react";
import { MessageProps } from "../Home/MyTasks";
import Notification from "../../Components/layout/Notification/Notification";
import { User } from "../../entities/User/User.entity";
type userProps = {
  email: string;
  fullName: string;
  password: string;
};

function Register() {
  const [userProps, setUserProps] = useState<userProps>({
    email: "",
    fullName: "",
    password: "",
  });
  const [message, setMessage] = useState<MessageProps>({
    text: "",
    type: "success",
  });
  const [notification, setNotification] = useState<boolean>(false);

  function handleUserProps(e: any) {
    switch (e.currentTarget.name) {
      case "email":
        setUserProps({
          ...userProps,
          email: e.currentTarget.value,
        });
        break;
      case "fullName":
        setUserProps({
          ...userProps,
          fullName: e.currentTarget.value,
        });
        break;
      case "password":
        setUserProps({
          ...userProps,
          password: e.currentTarget.value,
        });
    }
  }

  async function handleRegistration(e: any) {
    console.log(userProps);
    e.preventDefault();
    try {
      const user = User.create(userProps);
      const registrationRequest = await fetch(
        "https://schedule-backend.vercel.app/users",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await registrationRequest.json();
      localStorage.setItem("userProps", JSON.stringify(data));
      setMessage({
        text: "Usuário registrado com sucesso!",
        type: "success",
      });
      setNotification(true);
      return redirect("/login");
    } catch (err: any) {
      setMessage({
        text: err.message,
        type: "error",
      });
      setNotification(true);
    }
  }

  return (
    <ContainerForm>
      {notification ? (
        <Notification message={message.text} customClass={message.type} />
      ) : null}
      <h1 className={styles.title}>Registrar</h1>
      <Input
        name="email"
        onChange={handleUserProps}
        text="Email:"
        customClass="loginForm"
      />
      <Input
        name="fullName"
        onChange={handleUserProps}
        text="Nome Completo:"
        customClass="loginForm"
      />
      <Input
        name="password"
        onChange={handleUserProps}
        text="Password:"
        type="password"
        customClass="loginForm"
      />
      <div className={styles.btn}>
        <Button text="Registrar" onClick={handleRegistration} />
      </div>
      <p className={styles.login}>
        Já possui uma conta? Faca o <Link to="/login">Login</Link>
      </p>
    </ContainerForm>
  );
}

export default Register;
