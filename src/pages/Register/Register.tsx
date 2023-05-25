import { Link } from "react-router-dom";
import ContainerForm from "../../Components/ContainerForm/ContainerForm";
import Button from "../../Components/form/Button/Button";
import Input from "../../Components/form/Input/Input";
import styles from "./Register.module.css";

function Register() {
  return (
    <ContainerForm>
      <h1 className={styles.title}>Registrar</h1>
      <Input text="Email:" customClass="loginForm" />
      <Input text="Nome Completo:" customClass="loginForm" />
      <Input text="Password:" customClass="loginForm" />
      <div className={styles.btn}>
        <Button text="Registrar" />
        <Button text="Esqueci minha senha" />
      </div>
      <p className={styles.login}>
        Já possui uma conta? Faca o <Link to="/login">Login</Link>
      </p>
    </ContainerForm>
  );
}

export default Register;
