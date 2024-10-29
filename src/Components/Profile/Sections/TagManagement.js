import { useEffect, useContext, useState } from "react";
import ProfileSection from "./ProfileSection";
import userContext from "../../../store/user_context";

import styles from "./TagManagement.module.css";

const TagManagement = ({}) => {
  const [userDetails, setUserDetails] = useState(null);
  const { getToken } = useContext(userContext);

  return (
   <ProfileSection title="Manage Tags">
    <div>Hello</div>
   </ProfileSection> 
  )
};

export default TagManagement;
