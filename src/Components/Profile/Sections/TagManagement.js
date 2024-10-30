import { useEffect, useContext, useState } from "react";
import ProfileSection from "../ReusableComponents/ProfileSection";
import ReusableTable from "../ReusableComponents/ReusableTable";
import userContext from "../../../store/user_context";
import notificationContext from "../../../store/notification_context";

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
      <ReusableTable
        tableContentType="tags"
        isFetching={isFetching}
        isFetchingText={"Fetching Tags"}
        fallbackText={"No Tags Found"}
        headersArray={["Name", "Active", "Actions"]}
        rowsArray={tags}
      />
    </ProfileSection>
  );
};

export default TagManagement;
