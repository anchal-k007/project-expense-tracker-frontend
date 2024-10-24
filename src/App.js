import { useContext, useEffect, useState } from "react";
import Navigation from "./Components/Navigation/Navigation";
import MainLayout from "./Components/MainLayout/MainLayout";
import { NotificationContextProvider } from "./store/notification_context";
import { ExpensesContextProvider } from "./store/expenses_context";

import "./App.css";
import FormLayout from "./Components/Authentication/FormLayout";
import userContext from "./store/user_context";
import AnalysisCharts from "./Components/MainLayout/AnalysisCharts/AnalysisCharts";

const App = () => {
  const { isUserLoggedIn, handleLogin } = useContext(userContext);
  const [showPage, setShowPage] = useState("main");
  const toggleShowPage = (currentPage) => {
    if(currentPage === "main") setShowPage("analysis");
    else setShowPage("main");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_BACKEND_DEV_URL
            : process.env.REACT_APP_BACKEND_PROD_URL
        }/api/v1/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      <Navigation showPage={showPage} toggleShowPage={toggleShowPage}/>
      {!isUserLoggedIn && <FormLayout />}
      {isUserLoggedIn && (
        <NotificationContextProvider>
          <ExpensesContextProvider>
            {showPage === "main" ? <MainLayout /> : <AnalysisCharts />}
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
 * 2. Add authentication -> done
 * 3. Create the analysis page -> to be done
 * 4. Add client side validation on authentication -> done
 * 5. Add error handling to authentication -> done
 * @returns
 */
