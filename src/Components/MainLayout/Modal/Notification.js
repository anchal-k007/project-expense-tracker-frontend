import styles from "./Notification.module.css";
import CONSTANTS from "../../../utils/constants";

const Notification = ({ notification }) => {
  return (
    <div className={styles["notification"]}>
      <h1
        className={
          styles[
            `notification--${
              notification.status === CONSTANTS.NOTIFICATION_STATUS_ERROR
                ? CONSTANTS.NOTIFICATION_STATUS_ERROR
                : CONSTANTS.NOTIFICATION_STATUS_SUCCESS
            }`
          ]
        }
      >
        {notification.message}
      </h1>
    </div>
  );
};

export default Notification;
