import styles from "./NavBar.module.css";
import logo2 from "../../../assets/logo2.png";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar}>
        <img src={logo2} />

        <ul>
          <li>Home</li>
          <li>My Tasks</li>
          <li>About us</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
