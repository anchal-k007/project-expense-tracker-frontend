import { useState, useReducer, useContext } from "react";
import notificationContext from "../../../store/notification_context";
import styles from "./ExpenseForm.module.css";
import {
  getDateFromDateString,
  getDateStringFromDate,
} from "../../../utils/convertDateFormat";
import CONSTANTS from "./../../../utils/constants";
import expensesContext from "../../../store/expenses_context";
import userContext from "../../../store/user_context";

const expenseFormReducerFn = (expenseFormdata, action) => {
  const { fieldName, value } = action;
  if (fieldName === "tags") {
    let selectedTags = expenseFormdata.tags;
    if (value === "") {
      // Used when we want to clear the selections
      // In the case when a single option is selected and we want to deselect it does not work
      // Using CTRL + MouseClick on the already selected option gives an empty value. Thus we can use it to deselect
      selectedTags = [];
    } else if (selectedTags.findIndex((tag) => tag === value) !== -1) {
      // Unselect if the tag clicked was selected previously
      selectedTags = selectedTags.filter((tag) => tag !== value);
    } else {
      // else add it to the list
      selectedTags.push(value);
    }
    console.log(selectedTags, "--selectedTags--");
    return {
      ...expenseFormdata,
      tags: selectedTags,
    };
  }
  return {
    ...expenseFormdata,
    [fieldName]: value,
  };
};

const checkErrorsInForm = (formData) => {
  if (!formData.date) {
    return "Please choose a date";
  } else if (!formData.amount || formData.amount === "0") {
    return "Please enter an amount";
  } else if (+formData.amount < 0) {
    return "Amount cannot be negative";
  }
  // no errors found
  return false;
};

const ExpenseForm = ({ handleOnCancel, tagDetails }) => {
  // If the edit button on an tag is clicked, then the component edits the item
  // This is handled by the fact that tagDetails will be provided in that case
  // Else a new tag will be created
  const [tagFormData, tagFormDispatchFn] = useReducer(
    tagFormReducerFn,
    {
      name: tagDetails ? tagDetails.name : "",
      active: tagDetails ? tagDetails.active : true, 
    }
  );
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleNotification } = useContext(notificationContext);
  const { tags: { getTags } } = useContext(userContext);
  const { handleAddExpenseItem, handleUpdateExpenseItem } =
    useContext(expensesContext);

  const activeTags = getTags().filter((tag) => tag.active);

  const handleFormFieldChange = (event) => {
    expenseFormDispatchFn({
      fieldName: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    const errorPresentInForm = checkErrorsInForm(expenseFormData);
    if (errorPresentInForm) {
      setFormError(errorPresentInForm);
      return;
    }
    setFormError(false);
    setIsLoading(true);
    const dataToSend = {
      ...expenseFormData,
      date: getDateFromDateString(expenseFormData.date).toISOString(),
    };

    try {
      if (expenseItemDetails) {
        await handleUpdateExpenseItem(dataToSend, pickedDate);
      } else {
        await handleAddExpenseItem(dataToSend, pickedDate);
      }
      handleOnCancel();
      const notificationMessage = `${
        expenseItemDetails ? "Updated" : "Added"
      } expense`;
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
        notificationMessage,
        CONSTANTS.NOTIFICATION_TIME_SUCCESS
      );
    } catch (err) {
      handleOnCancel();
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_ERROR,
        err.message,
        CONSTANTS.NOTIFICATION_TIME_ERROR
      );
    }

    setIsLoading(false);
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
              min="0"
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
          {activeTags.length !== 0 && (
            <div
              className={`${styles["form-field"]} ${styles["form-field-flex"]}`}
            >
              <label htmlFor="tags">Tags</label>
              <select
                name="tags"
                type="number"
                onChange={handleFormFieldChange}
                value={expenseFormData.tags}
                multiple
                defaultChecked={false}
                size={1}
                onFocus={(event) => {
                  if (activeTags.length < 3)
                    event.target.length = activeTags.length;
                  else event.target.size = 3;
                }}
                onBlur={(event) => {
                  event.target.size = 1;
                }}
              >
                {activeTags.map((tag) => (
                  <option
                    key={tag._id}
                    value={tag._id}
                    selected={() => {   // mark selected tags during updation
                      if (
                        expenseItemDetails &&   // showing selected is only applicable for editing expense
                        expenseFormData.tags.findIndex(tag._id) !== -1
                      )
                        return true;
                      return false;
                    }}
                  >
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {formError && <div className={styles["form-error"]}>{formError}</div>}
        <div className={styles["form-buttons"]}>
          <button type="reset" onClick={handleOnCancel} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading && "Sending..."}
            {!isLoading && (expenseItemDetails ? "Update" : "Add")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
