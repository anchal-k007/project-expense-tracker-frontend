import { useReducer } from "react";
import styles from "./AuthForm.module.css";

const authFormReducer = (authFormData, action) => {
  if (action.type === "edit") {
    return {
      ...authFormData,
      [action.field]: action.value,
    };
  } else if (action.type === "reset") {
    return action.data;
  }
};

const AuthForm = ({ activeForm , handleIsUserLoggedIn }) => {
  let initialFormData = {
    email: "",
    password: "",
  };
  if (activeForm === "signup") {
    initialFormData.confirmPassword = "";
    initialFormData.name = "";
  }
  const [authFormData, authFormDispatchFn] = useReducer(
    authFormReducer,
    initialFormData
  );

  const handleFormFieldChange = (event) => {
    authFormDispatchFn({
      type: "edit",
      field: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(authFormData);
    // handleIsUserLoggedIn(true);
    const url = `http://localhost:4000/api/v1/auth/${activeForm === "signup" ? "signup" : "login"}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(authFormData),   
    }).then(response => {
      if(response.status / 100 !== 2) {
        // handle error
        throw new Error("Could not login");
      } else {
        return response.json();
      }
    }).then(data => {
      console.log("received the following data");
      console.log(data);
      localStorage.setItem("token", data.token);
      handleIsUserLoggedIn(true);
    }).catch(err => {
      console.log("The following errors occurred");
      console.log(err);
    });
  };

  const handleOnReset = () => {
    authFormDispatchFn({
      type: "reset",
      data: initialFormData,
    });
  };

  // const handleFormError = () => {};

  return (
    <div className={styles["form-content-container"]}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["form-fields"]}>
          {activeForm === "signup" && (
            <div className={styles["form-field"]}>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                onChange={handleFormFieldChange}
                value={authFormData.name}
              />
            </div>
          )}
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
          {activeForm === "signup" && (
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
          )}
        </div>
        {/* {formError && <div className={styles["form-error"]}>{formError}</div>} */}
        <div className={styles["form-buttons"]}>
          <button type="reset" onClick={handleOnReset}>
            Reset
          </button>
          <button type="submit">
            {activeForm === "login" ? "Login" : "Signup"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
