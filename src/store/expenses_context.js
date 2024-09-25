import { createContext, useContext, useState } from "react";

import userContext from "./user_context";

const expensesContext = createContext({
  expensesList: [
    {
      _id: "",
      date: new Date(),
      amount: 0,
      paymentMode: "",
      reason: "",
    },
  ],
  getExpensesList: async function (pickedDate) {},
  handleAddExpenseItem: async function (newExpenseItem, pickedDate) {},
  handleUpdateExpenseItem: async function (updatedExpenseItem, pickedDate) {},
  handleDeleteExpenseItem: async function (expenseId, pickedDate) {},
});

const ExpensesContextProvider = (props) => {
  const { getToken } = useContext(userContext);
  const [expensesList, setExpensesList] = useState([]);

  /**
   * Updates the expenses list to the expenses made on the pickedDate
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
        const data = await response.json();
        console.log(data);
        if(response.status === 500) 
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }
      const data = await response.json();
      setExpensesList(data.expenses);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Adds a new item. If pickedDate and newExpenseItem Date are the same, then the expenses list is updated by calling the getExpensesList method
   * @param {any} newExpenseItem
   * @param {Date} pickedDate
   */
  const handleAddExpenseItem = async (newExpenseItem, pickedDate) => {
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
        const data = await response.json();
        console.log(data);
        if(response.status === 500) 
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }

      if (pickedDate.toISOString() === newExpenseItem.date)
        getExpensesList(pickedDate);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Updates the given item. Also calls the getExpensesList function to update the expensesList
   * @param {any} newExpenseItem
   * @param {Date} pickedDate
   */
  const handleUpdateExpenseItem = async (updatedItem, pickedDate) => {
    try {
      const url = `http://localhost:4000/api/v1/expenses/update/${updatedItem._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedItem),
      });
      if (parseInt(response.status / 100) !== 2) {
        const data = await response.json();
        console.log(data);
        if(response.status === 500) 
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }
      // Update the list
      getExpensesList(pickedDate);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Deletes the given item. Also calls the getExpensesList function to update the expensesList
   * @param {any} newExpenseItem
   * @param {Date} pickedDate
   */
  const handleDeleteExpenseItem = async (expenseId, pickedDate) => {
    try {
      const url = `http://localhost:4000/api/v1/expenses/delete/${expenseId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (parseInt(response.status / 100) !== 2) {
        const data = await response.json();
        console.log(data);
        if(response.status === 500) 
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }
      // Update the list
      getExpensesList(pickedDate);
    } catch (err) {
      throw err;
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
