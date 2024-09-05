import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";
import { ExpensesContextProvider } from "./store/expenses_context";

import "./App.css";

const App = () => {
  return (
    <>
      <Navigation />
      <NotificationContextProvider >
        <ExpensesContextProvider >
          <MainLayout />
        </ExpensesContextProvider>
      </NotificationContextProvider>
    </>
  )
};

export default App;