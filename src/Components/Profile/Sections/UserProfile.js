import { useEffect, useContext, useState } from "react";
import ProfileSection from "../ReusableComponents/ProfileSection";
import userContext from "../../../store/user_context";

import styles from "./UserProfile.module.css";

const UserProfile = ({}) => {
  const [userDetails, setUserDetails] = useState(null);
  const { getToken } = useContext(userContext);
  useEffect(() => {
    async function getUserDetails() {
      const url = `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_BACKEND_DEV_URL
          : process.env.REACT_APP_BACKEND_PROD_URL
      }/api/v1/auth/verify`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await response.json();
      if (parseInt(response.status / 100) !== 2) {
        console.log(data);
        if (response.status === 500)
          throw new Error("An error occurred. Please try again later");
        throw new Error(data.message);
      }

      setUserDetails(data.user);
    }
  }, []);

  return (
    <ProfileSection title="Profile">
      <div>Hello</div>
    </ProfileSection>
  );
};

export default UserProfile;
