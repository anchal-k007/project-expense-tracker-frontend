import { createContext, useState } from "react";

const notificationContext = createContext({
  showNotification: false,
  status: "",
  message: "",
  handleNotification: (status, message, timeInSeconds = 1.5) => {}
});

const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState({
    showNotification: false,
    status: "",
    message: "",
  });

  const handleNotification = (status, message, timeInSeconds = 1.5) => {
    setNotification({
      showNotification: true,
      status,
      message,
    });
    setTimeout(() => {
      setNotification({
        showNotification: false,
      });
    }, timeInSeconds * 1000);
  };

  return (
    <notificationContext.Provider value={{
      ...notification,
      handleNotification,
    }}>
      {props.children}
    </notificationContext.Provider>
  )
}

export default notificationContext;
export {NotificationContextProvider};