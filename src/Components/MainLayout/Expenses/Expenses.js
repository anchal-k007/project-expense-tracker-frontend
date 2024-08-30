import { useState } from "react";

import styles from "./Expenses.module.css";
import ExpenseItem from "./ExpenseItem";
import ExpenseTableHeader from "./ExpenseTableHeader";

const DUMMY_EXPENSES = [
  {
    id: 1,
    date: new Date(2024, 7, 29),
    amount: 100,
    paymentMode: "Cash",
    reason: "Milk"
  },
  {
    id: 2,
    date: new Date(2024, 7, 25),
    amount: 150,
    paymentMode: "Cash",
    reason: "Eggs"
  },
  {
    id: 3,
    date: new Date(2024, 7, 29),
    amount: 249,
    paymentMode: "UPI",
    reason: "Food"
  },
  {
    id: 4,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 5,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 6,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 7,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 8,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 9,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 10,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 11,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 12,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 13,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 14,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 15,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
  {
    id: 16,
    date: new Date(2024, 7, 25),
    amount: 1000,
    paymentMode: "UPI",
    reason: "Party"
  },
];

const Expenses = (props) => {
  const [expenseList, setExpenseList] = useState(DUMMY_EXPENSES);
  const displayList = expenseList.filter(expense => {
    return expense.date.getTime() === props.pickedDate.getTime();
  });
  return (
    <div className={styles["expense-layout"]}> 
      <h1>{displayList.length === 0 ? "No Expenses To Show" : "Expenses"}</h1>
      {displayList.length !== 0 && 
        <table className={styles["expenses-table"]}>
          <tbody>
            <ExpenseTableHeader />
            {displayList.map(expenseItem => {
              return <ExpenseItem key={expenseItem.id} {...expenseItem} />
            })}
          </tbody>
        </table>
      }
    </div>
  )
};

export default Expenses;