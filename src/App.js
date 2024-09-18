import { useState } from "react";
import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";
import { ExpensesContextProvider } from "./store/expenses_context";

import "./App.css";
import FormLayout from "./Components/Authentication/FormLayout";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const handleIsUserLoggedIn = (value) => {
    setIsUserLoggedIn(value);
  };
  return (
    <>
      <Navigation
        isUserLoggedIn={isUserLoggedIn}
        handleIsUserLoggedIn={handleIsUserLoggedIn}
      />
      {!isUserLoggedIn && (
        <FormLayout handleIsUserLoggedIn={handleIsUserLoggedIn} />
      )}
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
