import { createContext, useState } from "react";

const userContext = createContext({
  name: "",
  isUserLoggedIn: false,
  handleLogin: (token, name) => {},
  handleLogout: () => {},
  getToken: () => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    isUserLoggedIn: false,
  });

  const handleLogin = (token, name) => {
    localStorage.setItem("token", token);
    setUser({
      name,
      isUserLoggedIn: true,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({
      name: "",
      isUserLoggedIn: false,
    });
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if(!token) {
      handleLogout();
      return;
    }
    return token;
  }

  return (
    <userContext.Provider
      value={{
        ...user,
        handleLogin,
        handleLogout,
        getToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
export { UserContextProvider };
