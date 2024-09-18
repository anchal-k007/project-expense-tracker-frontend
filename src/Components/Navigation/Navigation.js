import styles from "./Navigation.module.css";

const Navigation = ({ isUserLoggedIn, handleIsUserLoggedIn }) => {
  return (
    <nav className={styles["main-nav"]}>
      <h1>Expense Tracker App</h1>
      <ul>
        {isUserLoggedIn && (
          <li>
            <button>Welcome</button>
          </li>
        )}
        {isUserLoggedIn && (
          <li>
            <button onClick={() => handleIsUserLoggedIn(false)}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
