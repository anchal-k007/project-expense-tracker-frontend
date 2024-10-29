import { useEffect, useContext, useState } from "react";
import ProfileSection from "./ProfileSection";
import userContext from "../../../store/user_context";

import styles from "./ResetPassword.module.css";

const ResetPassword = ({}) => {
  const [userDetails, setUserDetails] = useState(null);
  const { getToken } = useContext(userContext);

  return (
   <ProfileSection title="Reset Password">
    <div>Hello</div>
   </ProfileSection> 
  )
};

export default ResetPassword;
