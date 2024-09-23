import { useContext, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";
import { ExpensesContextProvider } from "./store/expenses_context";

import "./App.css";
import FormLayout from "./Components/Authentication/FormLayout";
import userContext from "./store/user_context";

const App = () => {
  const { isUserLoggedIn, handleLogin } = useContext(userContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/api/v1/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            localStorage.removeItem("token");
          }
        })
        .then((data) => {
          handleLogin(data.token, data.user.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <>
      <Navigation isUserLoggedIn={isUserLoggedIn} />
      {!isUserLoggedIn && <FormLayout />}
      {isUserLoggedIn && (
        <NotificationContextProvider>
          <ExpensesContextProvider>
            <MainLayout />
          </ExpensesContextProvider>
        </NotificationContextProvider>
      )}
    </>
  );
};

export default App;

/**
 * TODO:
 * 1. Prepare a login page -> done
 * 2. Add authentication
 * 3. Create the analysis page
 * 4. Add client side validation on authentication
 * 5. Add error handling to authentication
 * @returns
 */
