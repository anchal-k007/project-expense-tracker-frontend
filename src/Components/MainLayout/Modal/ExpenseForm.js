import { useState } from "react";
import styles from "./ExpenseForm.module.css";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../../utils/convertDateFormat";

const ExpenseForm = ({
  handleOnCancel,
  pickedDate,
  addExpenseItem,
  expenseItemDetails,
  updateExpenseItem,
}) => {
  // If the edit button on an expense item is clicked, then the component edits the item
  // This is handled by the fact that expenseItemDetails will be provided in that case
  // Else a new item will be added to the list
  const dateString = getDateStringFromDate(pickedDate);
  const [expenseFormData, setExpenseFormData] = useState({
    date: dateString,
    amount: expenseItemDetails ? expenseItemDetails.amount : "",
    reason: expenseItemDetails ? expenseItemDetails.reason : "",
    paymentMode: expenseItemDetails ? expenseItemDetails.paymentMode : "UPI",
  });

  const handleFormFieldChange = (event) => {
    const value = event.target.value;
    if (event.target.name === "date") {
      setExpenseFormData((prevExpenseFormData) => {
        return {
          ...prevExpenseFormData,
          date: value,
        };
      });
    } else if (event.target.name === "amount") {
      setExpenseFormData((prevExpenseFormData) => {
        return {
          ...prevExpenseFormData,
          amount: +value,
        };
      });
    } else if (event.target.name === "paymentMode") {
      setExpenseFormData((prevExpenseFormData) => {
        return {
          ...prevExpenseFormData,
          paymentMode: value,
        };
      });
    } else if (event.target.name === "reason") {
      setExpenseFormData((prevExpenseFormData) => {
        return {
          ...prevExpenseFormData,
          reason: value,
        };
      });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    expenseFormData.date = getDateFromDateString(expenseFormData.date);
    if (expenseItemDetails) {
      updateExpenseItem({
        ...expenseFormData,
        paymentId: expenseItemDetails.paymentId,
      });
    } else {
      addExpenseItem(expenseFormData);
    }
    handleOnCancel();
  };

  return (
    <div className={styles["modal-content-container"]}>
      <h1>{expenseItemDetails ? "Update Expense" : "Add New Expense"}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["form-fields"]}>
          <div className={styles["form-field"]}>
            <label htmlFor="date">Date</label>
            <input
              name="date"
              type="date"
              onChange={handleFormFieldChange}
              value={expenseFormData.date}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="amount">Amount</label>
            <input
              name="amount"
              type="number"
              onChange={handleFormFieldChange}
              value={expenseFormData.amount}
              placeholder="Amount In Rupees"
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="paymentMode">Payment Mode</label>
            <select
              name="paymentMode"
              type="number"
              onChange={handleFormFieldChange}
              value={expenseFormData.paymentMode}
            >
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="reason">Reason</label>
            <input
              name="reason"
              onChange={handleFormFieldChange}
              value={expenseFormData.reason}
            />
          </div>
        </div>
        <div className={styles["form-buttons"]}>
          <button type="reset" onClick={handleOnCancel}>
            Cancel
          </button>
          <button type="submit">{expenseItemDetails ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
