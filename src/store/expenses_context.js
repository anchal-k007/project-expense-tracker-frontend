import { createContext, useContext, useState } from "react";

import userContext from "./user_context";

const expensesContext = createContext({
  expensesList: [
    {
      expenseId: "",
      date: new Date(),
      amount: 0,
      paymentMode: "",
      reason: "",
    },
  ],
  handleAddExpenseItem: async function (newExpenseItem, pickedDate = null) {},
  handleUpdateExpenseItem: async function (updatedExpenseItem, pickedDate) {},
  handleDeleteExpenseItem: async function (updatedExpenseItem, pickedDate) {},
  getExpensesList: async function (pickedDate) {},
});

const ExpensesContextProvider = (props) => {
  const { getToken } = useContext(userContext);
  const [expensesList, setExpensesList] = useState([]);

  const handleAddExpenseItem = async (newExpenseItem, pickedDate = null) => {
    try {
      const url = `http://localhost:4000/api/v1/expenses/new`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(newExpenseItem),
      });

      if (parseInt(response.status / 100) !== 2) {
        console.log(await response.json());
        throw new Error("An error occurred");
      }

      const data = await response.json();
      if(pickedDate)
        getExpensesList(pickedDate);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExpenseItem = async (expenseId, pickedDate) => {
    try {
      const url = `http://localhost:4000/api/v1/expenses/delete/${expenseId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
      });
      if(parseInt(response.status / 100) !== 2) {
        console.log(await response.json());
        throw new Error("An error occurred");
      }
      // Update the list
      getExpensesList(pickedDate);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleUpdateExpenseItem = async (updatedItem, pickedDate) => {
    try {
      const url = `http://localhost:4000/api/v1/expenses/update/${updatedItem._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify(updatedItem),
      });
      if(parseInt(response.status / 100) !== 2) {
        console.log(await response.json());
        throw new Error("An error occurred");
      }
      // Update the list
      getExpensesList(pickedDate);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Date object expected. Gets converted to ISOString internally
   * @param {Date} pickedDate 
   */
  const getExpensesList = async (pickedDate) => {
    const url = `http://localhost:4000/api/v1/expenses/get-expenses?date=${pickedDate.toISOString()}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (parseInt(response.status / 100) !== 2) {
        console.log(await response.json());
        throw new Error("An error occurred");
      }
      const data = await response.json();
      setExpensesList(data.expenses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <expensesContext.Provider
      value={{
        expensesList: expensesList,
        handleAddExpenseItem,
        handleUpdateExpenseItem,
        handleDeleteExpenseItem,
        getExpensesList,
      }}
    >
      {props.children}
    </expensesContext.Provider>
  );
};

export default expensesContext;
export { ExpensesContextProvider };
