import { useState, useReducer, useContext } from "react";
import notificationContext from "../../../store/notification_context";
import styles from "./TagForm.module.css";
import CONSTANTS from "./../../../utils/constants";
import userContext from "../../../store/user_context";

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

async function handleTagFormSubmit(tag, getToken, update = false) {
  let url = `${
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_DEV_URL
      : process.env.REACT_APP_BACKEND_PROD_URL
  }/api/v1/user/tags`;
  if (update) url = url.concat(`/${tag._id}`);
  try {
    const response = await fetch(url, {
      method: update ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
    const data = await response.json();
    if (parseInt(response.status / 100) !== 2) {
      console.log(data);
      if (response.status === 500)
        throw new Error("An error occurred. Please try again later");
      throw new Error(data.message);
    }
    console.log(data);
  } catch (err) {
    throw err;
  }
}

const TagForm = ({ handleOnCancel, tagDetails, displayUpdatedTags }) => {
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

  const { getToken } = useContext(userContext);
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
    try {
      if (tagDetails) {
        await handleTagFormSubmit(tagFormData, getToken, true);
      } else {
        await handleTagFormSubmit(tagFormData, getToken);
      }
      handleOnCancel();
      const notificationMessage = `Tag ${tagDetails ? "Updated" : "Created"}`;
      handleNotification(
        CONSTANTS.NOTIFICATION_STATUS_SUCCESS,
        notificationMessage,
        CONSTANTS.NOTIFICATION_TIME_SUCCESS
      );
      await displayUpdatedTags();
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

export default TagForm;
