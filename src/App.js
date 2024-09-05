import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";

import "./App.css";

const App = () => {
  return (
    <NotificationContextProvider >
      <Navigation />
      <MainLayout />
    </NotificationContextProvider>
  )
};

export default App;