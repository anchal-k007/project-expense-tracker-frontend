import { useEffect, useContext, useState } from "react";
import ProfileSection from "./ProfileSection";
import userContext from "../../../store/user_context";
import notificationContext from "../../../store/notification_context";

import styles from "./TagManagement.module.css";
import CONSTANTS from "../../../utils/constants";

const TagManagement = ({}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [tags, setTags] = useState([]);

  const { handleNotification } = useContext(notificationContext);
  const {
    tags: { fetchUserTags, getTags },
  } = useContext(userContext);

  useEffect(() => {
    async function initialLoad() {
      setIsFetching(true);
      try {
        await fetchUserTags();
      } catch (err) {
        handleNotification(
          CONSTANTS.NOTIFICATION_STATUS_ERROR,
          err.message,
          CONSTANTS.NOTIFICATION_TIME_ERROR
        );
      }
      setTags(getTags());
      setIsFetching(false);
    }
    initialLoad();
  }, []);

  return (
    <ProfileSection title="Manage Tags">
      <table>
        <tbody>
          <th>
            <td>Name</td>
            <td>Active</td>
            <td>Actions</td>
          </th>
          {tags.map((tag) => {
            return (
              <tr>
                <td>{tag.name}</td>
                <td>{tag.active ? "Yes" : "No"}</td>
                <td>Edit</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ProfileSection>
  );
};

export default TagManagement;
