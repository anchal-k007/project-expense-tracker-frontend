import { useState, useContext, useEffect, useReducer } from "react";
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
  const [authFormError, setAuthFormError] = useState(false);

  useEffect(() => {
    // changing activeForm does not lead to a resetting of values, this piece of code makes sure that it does
    authFormDispatchFn({ type: "reset", activeForm });
    setAuthFormError(false);
  }, [activeForm]);

  const handleFormFieldChange = (event) => {
    authFormDispatchFn({
      type: "edit",
      field: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      activeForm === "signup" &&
      authFormData.password !== authFormData.confirmPassword
    ) {
      setAuthFormError("password and confirmPassword do not match");
      return;
    }
    setAuthFormError(false);
    const url = `http://localhost:4000/api/v1/auth/${activeForm}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authFormData),
      });
      const data = await response.json();

      if (parseInt(response.status / 100) !== 2) {
        setAuthFormError(data.message);
        return;
      }
      handleLogin(data.token, data.user.name);
      setAuthFormError(false);
    } catch (err) {
      setAuthFormError("An Error Occurred. Please try again later");
    }
  };

  const handleOnReset = () => {
    authFormDispatchFn({
      type: "reset",
      activeForm,
    });
  };

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
                required
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
              required
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
              required
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
                required
              />
            </div>
          )}
        </div>
        {authFormError && (
          <div className={styles["form-error"]}>
            <p>{authFormError}</p>
          </div>
        )}
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
