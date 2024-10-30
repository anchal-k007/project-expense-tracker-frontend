import { useEffect, useContext, useState } from "react";
import ProfileSection from "./ProfileSection";
import ReusableTable from "./ReusableTable";
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

  function createTagTableRow(tag, editFunction) {
    return (
      <tr key={tag._id}>
        <td>{tag.name}</td>
        <td>{tag.active ? "Yes" : "No"}</td>
        <td>
          <button>Edit</button>
        </td>
      </tr>
    );
  }

  return (
    <ProfileSection title="Manage Tags">
      <ReusableTable
        isFetching={isFetching}
        isFetchingText={"Fetching Tags"}
        fallbackText={"No Tags Found"}
        headersArray={["Name", "Active", "Actions"]}
        rowsArray={tags}
        tableRowsCreatorFunction={createTagTableRow}
      />
    </ProfileSection>
  );
};

export default TagManagement;
