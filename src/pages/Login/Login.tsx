import { Link } from "react-router-dom";
import ContainerForm from "../../Components/ContainerForm/ContainerForm";
import Button from "../../Components/form/Button/Button";
import Input from "../../Components/form/Input/Input";
import styles from "./Login.module.css";
import { useState } from "react";
import { SetPopUpProps } from "../../App";

function Login({ setMessage, setNotification }: SetPopUpProps) {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function handleLogin(e: any) {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  }

  async function sendLoginRequest(e: any) {
    e.preventDefault();
    const loginProps = {
      email,
      password,
    };
    await fetch("https://schedule-backend.vercel.app/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginProps),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Usuário ou senha invalidos") {
          setMessage({
            text: data.message,
            type: "error",
          });
          setNotification(true);
          return;
        }
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("token", data.token);
        window.location.href = "/mytasks";
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          setMessage({
            text: "Ops, isso não foi possivel agora.",
            type: "error",
          });
          setNotification(true);
          return;
        }
      });
  }

  return (
    <ContainerForm>
      <h1 className={styles.title}>Login</h1>
      <Input
        text="Email:"
        name="email"
        onChange={handleLogin}
        customClass="loginForm"
      />
      <Input
        text="Password:"
        name="password"
        type="password"
        onChange={handleLogin}
        customClass="loginForm"
      />
      <div className={styles.btn}>
        <Button text="Login" onClick={sendLoginRequest} />
        <Button text="Esqueci minha senha" />
      </div>
      <p className={styles.register}>
        Ainda não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
    </ContainerForm>
  );
}

export default Login;
