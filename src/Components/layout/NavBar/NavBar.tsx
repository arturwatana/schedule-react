import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaReact } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { useState, useEffect } from "react";

function NavBar() {
  const [burguerIsOpen, setBurguerIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  function handleIsLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }

  function logoutUser(e: any) {
    if (e.target.innerText === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    handleIsLoggedIn();
  });

  function handleBurguer() {
    setBurguerIsOpen(!burguerIsOpen);
  }

  return (
    <div className={styles.navBar}>
      <nav className={styles.navBar}>
        <Link to="/" className={styles.logo}>
          <FaReact className={styles.reactLogo} />
          <h1>Schedule React</h1>
        </Link>
        <div>
          <CiMenuBurger className={styles.burguer} onClick={handleBurguer} />

          {burguerIsOpen ? (
            <ul className={styles.burguerItens}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mytasks">My Tasks</Link>
              </li>
              <li onClick={logoutUser}>
                <Link to="/login">{!isLoggedIn ? "Login" : "Logout"}</Link>
              </li>
            </ul>
          ) : null}
        </div>
        <div className={styles.navBarItens}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mytasks">My Tasks</Link>
            </li>
            <li onClick={logoutUser}>
              <Link to="/login">{!isLoggedIn ? "Login" : "Logout"}</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
