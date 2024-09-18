import { useReducer } from "react";
import styles from "./AuthForm.module.css";

const authFormReducer = (authFormData, action) => {

}

const AuthForm = ({ activeForm }) => {
  const initialFormData = {
    email: "",
    password: "",
  }
  if(activeForm === "signup") {
    initialFormData.confirmPassword = "";
    initialFormData.name = "";
  }
  const [authFormData, authFormDispatchFn] = useReducer(authFormReducer, initialFormData);

  const handleFormFieldChange = (event) => {

  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

  }

  const handleOnCancel = () => {

  }

  const handleFormError = () => {

  }
  
  return (
    <div className={styles["form-content-container"]}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["form-fields"]}>    
          {activeForm === "signup" &&           
            <div className={styles["form-field"]}>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                onChange={handleFormFieldChange}
                value={authFormData.name}
                />
            </div>
          }
          <div className={styles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleFormFieldChange}
              value={authFormData.email}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleFormFieldChange}
              value={authFormData.password}
              minLength={5}
            />
          </div>
          {activeForm === "signup" &&           
            <div className={styles["form-field"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                onChange={handleFormFieldChange}
                value={authFormData.confirmPassword}
                minLength={5}
                />
            </div>
          }
        </div>
        {/* {formError && <div className={styles["form-error"]}>{formError}</div>} */}
        <div className={styles["form-buttons"]}>
          <button type="reset" onClick={handleOnCancel}>
            Reset
          </button>
          <button type="submit">{activeForm === "login" ? "Login" : "Signup"}</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
