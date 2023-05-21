import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaReact } from "react-icons/fa";

function NavBar() {
  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar}>
        <Link to="/" className={styles.logo}>
          <FaReact className={styles.reactLogo} />
          <h1>Schedule React</h1>
        </Link>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/mytasks">My Tasks</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
