import { useState, useReducer, useContext } from "react";
import notificationContext from "../../../store/notification_context";
import styles from "./TagForm.module.css";
import CONSTANTS from "./../../../utils/constants";

const tagFormReducerFn = (expenseFormdata, action) => {
  const { fieldName, value } = action;
  return {
    ...expenseFormdata,
    [fieldName]: value,
  };
};

const checkErrorsInForm = (formData) => {
  if (!formData.name) {
    return "Please name the tag";
  } 
  // no errors found
  return false;
};

const ExpenseForm = ({ handleOnCancel, tagDetails }) => {
  // If the edit button on an tag is clicked, then the component edits the item
  // This is handled by the fact that tagDetails will be provided in that case
  // Else a new tag will be created
  const [tagFormData, tagFormDispatchFn] = useReducer(tagFormReducerFn, {
    _id: tagDetails ? tagDetails._id : null,
    name: tagDetails ? tagDetails.name : "",
    active: tagDetails ? tagDetails.active : true,
  });
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleNotification } = useContext(notificationContext);

  const handleFormFieldChange = (event) => {
    tagFormDispatchFn({
      fieldName: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    const errorPresentInForm = checkErrorsInForm(tagFormData);
    if (errorPresentInForm) {
      setFormError(errorPresentInForm);
      return;
    }
    setFormError(false);
    setIsLoading(true);
    
    console.log(tagFormData);
    setIsLoading(false);
    return;

    // try {
    //   if (expenseItemDetails) {
    //     await handleUpdateExpenseItem(dataToSend, pickedDate);
    //   } else {
    //     await handleAddExpenseItem(dataToSend, pickedDate);
    //   }
    //   handleOnCancel();
    //   const notificationMessage = `${
    //     expenseItemDetails ? "Updated" : "Added"
    //   } expense`;
    //   handleNotification(
    //     CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
    //     notificationMessage,
    //     CONSTANTS.NOTIFICATION_TIME_SUCCESS
    //   );
    // } catch (err) {
    //   handleOnCancel();
    //   handleNotification(
    //     CONSTANTS.NOTIFICATION_STATUS_ERROR,
    //     err.message,
    //     CONSTANTS.NOTIFICATION_TIME_ERROR
    //   );
    // }

    // setIsLoading(false);
  };

  return (
    <div className={styles["modal-content-container"]}>
      <h1>{!tagDetails ? "Create A New Tag" : "Update Tag"}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className={styles["form-fields"]}>
          <div className={styles["form-field"]}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={handleFormFieldChange}
              value={tagFormData.name}
              placeholder="Name Of The Tag"
              minLength={1}
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="active">Active</label>
            <select
              name="active"
              onChange={handleFormFieldChange}
              value={tagFormData.active}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        {formError && <div className={styles["form-error"]}>{formError}</div>}
        <div className={styles["form-buttons"]}>
          <button type="reset" onClick={handleOnCancel} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading && "Sending..."}
            {!isLoading && (tagDetails ? "Update" : "Create")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
