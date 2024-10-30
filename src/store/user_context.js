import { createContext, useState } from "react";

const userContext = createContext({
  name: "",
  isUserLoggedIn: false,
  handleLogin: (token, name) => {},
  handleLogout: () => {},
  getToken: () => {},
  tags: {
    getTags: () => {},
    fetchUserTags: async (token = "") => {},
  },
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
    fetchUserTags(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tags");
    setUser({
      name: "",
      isUserLoggedIn: false,
    });
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      handleLogout();
      return;
    }
    return token;
  };

  const fetchUserTags = async (token = "") => {
    if (token.length === 0) token = getToken();
    const url = `${
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_BACKEND_DEV_URL
        : process.env.REACT_APP_BACKEND_PROD_URL
    }/api/v1/user/tags`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (parseInt(response.status / 100) !== 2) {
      console.log(data);
      if (response.status === 500)
        throw new Error("An error occurred. Please try again later");
      throw new Error(data.message);
    }
    const filteredTags = data.tags.map((tag) => {
      const { _id, active, name} = tag;
      return { _id, active, name };
    });
    localStorage.setItem("tags", JSON.stringify(filteredTags));
  };

  const getTags = () => {
    const tags = localStorage.getItem("tags");
    if(!tags) return [];
    return JSON.parse(tags);
  }

  return (
    <userContext.Provider
      value={{
        ...user,
        handleLogin,
        handleLogout,
        getToken,
        tags: {
          getTags,
          fetchUserTags,
        }
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
export { UserContextProvider };
