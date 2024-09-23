import { useContext, useEffect, useReducer } from "react";
import styles from "./AuthForm.module.css";
import userContext from "../../store/user_context";

const authFormReducer = (authFormData, action) => {
  if (action.type === "edit") {
    return {
      ...authFormData,
      [action.field]: action.value,
    };
  } else if (action.type === "reset") {
    return authFormInitialisationFn(action.activeForm);
  }
};

const authFormInitialisationFn = (activeForm) => {
  if (activeForm === "login")
    return {
      email: "",
      password: "",
    };
  return {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  };
};

const AuthForm = ({ activeForm }) => {
  const [authFormData, authFormDispatchFn] = useReducer(
    authFormReducer,
    activeForm,
    authFormInitialisationFn
  );
  const { handleLogin } = useContext(userContext);
  
  useEffect(() => {
    // changing activeForm does not lead to a resetting of values, this piece of code makes sure that it does
    authFormDispatchFn({ type: "reset", activeForm });
  }, [activeForm]);

  const handleFormFieldChange = (event) => {
    authFormDispatchFn({
      type: "edit",
      field: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    // TODO: add client side validation
    event.preventDefault();
    const url = `http://localhost:4000/api/v1/auth/${
      activeForm === "signup" ? "signup" : "login"
    }`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authFormData),
    })
      .then((response) => {
        if (response.status / 100 !== 2) {
          // handle error
          // throw new Error("Could not login");
          console.log(response.json());
        } else {
          return response.json();
        }
      })
      .then((data) => {
        handleLogin(data.token, data.user.name);
      })
      .catch((err) => {
        console.log("The following errors occurred");
        console.log(err);
      });
  };

  const handleOnReset = () => {
    authFormDispatchFn({
      type: "reset",
      activeForm
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
