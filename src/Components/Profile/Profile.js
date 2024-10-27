import styles from "./Profile.module.css";

const Profile = ({}) => {
  return (
    <div className={styles["profile-layout"]}>
      <h1>This is the profile page</h1>
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
 */
