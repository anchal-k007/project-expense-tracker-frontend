import { useContext } from "react";
import styles from "./Navigation.module.css";
import userContext from "../../store/user_context";

const Navigation = ({ showPage, toggleShowPage }) => {
  const { isUserLoggedIn, name, handleLogout } = useContext(userContext);
  return (
    <nav className={styles["main-nav"]}>
      <h1>Expense Tracker App</h1>
      <ul>
        {isUserLoggedIn && (
          <ul>
            <li>
              <button onClick={() => toggleShowPage("profile")}>
                Welcome {name.split(" ")[0]}
              </button>
            </li>
            <li>
              <button onClick={() => toggleShowPage("expenses")}>Expenses</button>
            </li>
            <li>
              <button onClick={() => toggleShowPage("analysis")}>
                Analysis
              </button>
            </li>
          </ul>
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
