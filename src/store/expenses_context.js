import { createContext, useState } from "react";

import DUMMY_EXPENSES from "../utils/dummyExpenses";

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
});

const ExpensesContextProvider = (props) => {
  const [expensesList, setExpensesList] = useState(DUMMY_EXPENSES);

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

  return (
    <expensesContext.Provider
      value={{
        expensesList: expensesList,
        getDisplayList,
        handleAddExpenseItem,
        handleUpdateExpenseItem,
        handleDeleteExpenseItem,
      }}
    >
      {props.children}
    </expensesContext.Provider>
  );
};

export default expensesContext;
export { ExpensesContextProvider };
