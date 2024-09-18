import { useState } from "react";
import styles from "./FormLayout.module.css";
import AuthForm from "./AuthForm";

const FormLayout = ({ handleIsUserLoggedIn }) => {
  const [activeForm, setActiveForm] = useState("login");
  const handleActiveForm = (value) => {
    setActiveForm(value);
  };

  return (
    <div className={styles["form-layout"]}>
      <div className={styles["form-box"]}>
        <div className={styles["form-selection-box"]}>
          <button
            className={`${activeForm === "login" ? styles.active : ""}`}
            onClick={() => handleActiveForm("login")}
          >
            Login
          </button>
          <button
            className={`${activeForm === "signup" ? styles.active : ""}`}
            onClick={() => handleActiveForm("signup")}
          >
            Signup
          </button>
        </div>
        <AuthForm
          activeForm={activeForm}
          handleIsUserLoggedIn={handleIsUserLoggedIn}
        />
      </div>
    </div>
  );
};

export default FormLayout;
