import { useState , useReducer , useContext } from "react";
import notificationContext from "../../../store/notification_context";
import styles from "./ExpenseForm.module.css";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../../utils/convertDateFormat";
import CONSTANTS from "./../../../utils/constants";

const expenseFormReducerFn = (expenseFormdata, action) => {
  const {fieldName , value} = action;
  return {
    ...expenseFormdata,
    [fieldName]: value,
  }
}

const ExpenseForm = ({
  handleOnCancel,
  pickedDate,
  handleAddExpenseItem,
  expenseItemDetails,
  handleUpdateExpenseItem,
}) => {
  // If the edit button on an expense item is clicked, then the component edits the item
  // This is handled by the fact that expenseItemDetails will be provided in that case
  // Else a new item will be added to the list
  const dateString = getDateStringFromDate(pickedDate);
  const [expenseFormData, expenseFormDispatchFn] = useReducer(expenseFormReducerFn, {
    date: dateString,
    amount: expenseItemDetails ? expenseItemDetails.amount : "",
    reason: expenseItemDetails ? expenseItemDetails.reason : "",
    paymentMode: expenseItemDetails ? expenseItemDetails.paymentMode : "UPI",
  });
  const [formError, setFormError] = useState(null);

  const {handleNotification} = useContext(notificationContext);

  const handleFormFieldChange = (event) => {
    expenseFormDispatchFn({
      fieldName: event.target.name,
      value: event.target.value,
    });
  };

  const checkErrorsInForm = (formData) => {
    // Check date
    if (!formData.date) {
      return "Please choose a date";
    } else if (!formData.amount || formData.amount === "0") {
      return "Please enter an amount";
    }
    // no errors found
    return false;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errorPresentInForm = checkErrorsInForm(expenseFormData);
    if (errorPresentInForm) {
      setFormError(errorPresentInForm);
      return;
    }
    setFormError(false);
    expenseFormData.date = getDateFromDateString(expenseFormData.date);
    if (expenseItemDetails) {
      handleUpdateExpenseItem({
        ...expenseFormData,
        paymentId: expenseItemDetails.paymentId,
      });
    } else {
      handleAddExpenseItem(expenseFormData);
    }
    handleOnCancel();
    const notificationMessage = `${expenseItemDetails ? "Updated" : "Added"} expense`
    handleNotification(
      CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
      notificationMessage,
      CONSTANTS.NOTIFICATION_TIME_SUCCESS
    );
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
        {formError && <div className={styles["form-error"]}>{formError}</div>}
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
