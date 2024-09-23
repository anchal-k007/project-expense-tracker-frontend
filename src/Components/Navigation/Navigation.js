import { useContext } from "react";
import styles from "./Navigation.module.css";
import userContext from "../../store/user_context";

const Navigation = () => {
  const { isUserLoggedIn, name, handleLogout } = useContext(userContext);
  return (
    <nav className={styles["main-nav"]}>
      <h1>Expense Tracker App</h1>
      <ul>
        {isUserLoggedIn && (
          <li>
            <button>Welcome {name.split(" ")[0]}</button>
          </li>
        )}
        {isUserLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
