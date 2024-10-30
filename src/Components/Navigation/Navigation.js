import { useContext } from "react";
import userContext from "../../store/user_context";
import styles from "./Navigation.module.css";
import CONSTANTS from "../../utils/constants";

const Navigation = ({ showPage, toggleShowPage }) => {
  const { isUserLoggedIn, name, handleLogout } = useContext(userContext);
  return (
    <nav className={styles["main-nav"]}>
      <h1>Expense Tracker App</h1>
      <ul>
        {isUserLoggedIn && (
          <ul>
            <li>
              <button
                onClick={() => toggleShowPage(CONSTANTS.SHOW_PAGE_PROFILE)}
              >
                Welcome {name.split(" ")[0]}
              </button>
            </li>
            <li>
              <button
                onClick={() => toggleShowPage(CONSTANTS.SHOW_PAGE_EXPENSES)}
              >
                Expenses
              </button>
            </li>
            <li>
              <button
                onClick={() => toggleShowPage(CONSTANTS.SHOW_PAGE_ANALYSIS)}
              >
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
