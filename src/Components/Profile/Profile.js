import { useContext } from "react";
import Notification from "../MainLayout/Modal/Notification";

import notificationContext from "../../store/notification_context";
import UserProfile from "./Sections/UserProfile";
import ResetPassword from "./Sections/ResetPassword";
import TagManagement from "./Sections/TagManagement";

import styles from "./Profile.module.css";

const Profile = ({}) => {
  const { showNotification } = useContext(notificationContext);
  return (
    <div className={styles["profile-layout"]}>
      {showNotification && <Notification />}
      {/* <UserProfile /> */}
      {/* <ResetPassword /> */}
      <TagManagement />
      {/* <PaymentModeManagement /> */}
    </div>
  );
};

export default Profile;

/**
 * 1. User profile -> name, email, update name (optional)
 * 2. Change password -> current password, new password, confirm new password
 *                    -> check new password and confirm new password at frontend, old password at backend
 * 3. Tag Management  -> list of all the tags, irrespective of active state
 *                    -> Edit name and active state
 *                    -> Update the localStorage state
 * 4. Payment Modes   -> Show all the payment modes, active and inactive
 *     (Future)       -> Edit name and active state
 *                    -> Update the localStorage state
 * 
 * Move Notification component from each page to App
 */
