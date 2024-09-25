import { createContext, useContext, useState } from "react";

import DUMMY_EXPENSES from "../utils/dummyExpenses";
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
  getDisplayList: function (pickedDate) {},
  handleAddExpenseItem: function () {},
  handleUpdateExpenseItem: function () {},
  handleDeleteExpenseItem: function () {},
  getExpensesList: async function (pickedDate) {},
});

const ExpensesContextProvider = (props) => {
  const { getToken } = useContext(userContext);
  const [expensesList, setExpensesList] = useState([]);

  const getDisplayList = (pickedDate) => {
    return expensesList.filter((expense) => {
      return expense.date.getTime() === pickedDate.getTime();
    });
  };

  const handleAddExpenseItem = (newExpenseItem) => {
    newExpenseItem.expenseId = Date.now().toString();
    setExpensesList((prevList) => {
      const newExpensesList = [...prevList];
      newExpensesList.push(newExpenseItem);
      return newExpensesList;
    });
  };

  const handleDeleteExpenseItem = (itemId) => {
    setExpensesList((prevExpensesList) =>
      prevExpensesList.filter((expenseItem) => expenseItem.expenseId !== itemId)
    );
  };

  const handleUpdateExpenseItem = (updatedItem) => {
    setExpensesList((prevExpensesList) => {
      return prevExpensesList.map((expenseItem) => {
        if (expenseItem.expenseId === updatedItem.expenseId) {
          expenseItem = { ...updatedItem };
        }
        return expenseItem;
      });
    });
  };

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
        getDisplayList,
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
