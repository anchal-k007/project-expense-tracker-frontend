import { useContext } from "react";
import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";
import { ExpensesContextProvider } from "./store/expenses_context";

import "./App.css";
import FormLayout from "./Components/Authentication/FormLayout";
import userContext from "./store/user_context";

const App = () => {
  const { isUserLoggedIn } = useContext(userContext);
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
 * @returns
 */
