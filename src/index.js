import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./store/user_context";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
