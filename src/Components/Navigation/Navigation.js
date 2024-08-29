import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles["main-nav"]}>
      <h1>Expense Tracker App</h1>
      <ul>
        <li>
          <button>Sign-Up</button>
        </li>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;