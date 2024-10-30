import { useEffect, useContext, useState } from "react";
import ProfileSection from "../ReusableComponents/ProfileSection";
import ReusableTable from "../ReusableComponents/ReusableTable";
import TagModal from "../Modals/TagModal";
import userContext from "../../../store/user_context";
import notificationContext from "../../../store/notification_context";

import CONSTANTS from "../../../utils/constants";
import styles from "./TagManagement.module.css";

const TagManagement = ({}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      <div className={styles["create-tag-container"]}>
        <button onClick={() => setShowModal(true)}>Create New Tag</button>
      </div>
      {showModal && <TagModal handleHideModal={() => setShowModal(false)} />}
    </ProfileSection>
  );
};

export default TagManagement;
