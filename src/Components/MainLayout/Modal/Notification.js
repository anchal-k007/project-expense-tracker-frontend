import { useContext } from "react";
import notificationContext from "../../../store/notification_context";
import CONSTANTS from "../../../utils/constants";
import styles from "./Notification.module.css";

const Notification = () => {
  const notification = useContext(notificationContext);
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
