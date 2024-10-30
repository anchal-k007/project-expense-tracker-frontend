import { useState } from "react";
import TagModal from "../Modals/TagModal";
import styles from "./ReusableTable.module.css";

function CreateTagTableRow({ tag, displayUpdatedTags }) {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };
  const displayModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <tr key={tag._id}>
        <td>{tag.name}</td>
        <td>
          <span className={styles[`active--${tag.active ? "yes" : "no"}`]}>
            {tag.active ? "Yes" : "No"}
          </span>
        </td>
        <td className={styles.options}>
          <button className={styles["edit-button"]} onClick={displayModal}>
            Edit
          </button>
        </td>
      </tr>
      {showModal && (
        <TagModal
          handleHideModal={hideModal}
          tagDetails={tag}
          displayUpdatedTags={displayUpdatedTags}
        />
      )}
    </>
  );
}

/** TODO: Implement when working with paymentModes
function CreatePaymentModeTableRow({ paymentMode }) {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };
  const displayModal = () => {
    setShowModal(true);
  };

  console.log(paymentMode, "--paymentMode--");
  return (
    <>
      <tr key={paymentMode._id}>
        <td>{paymentMode.name}</td>
        <td>{paymentMode.active ? "Yes" : "No"}</td>
        <td>
          <button className={styles["edit-button"]} onClick={displayModal}>
            Edit
          </button>
        </td>
      </tr>
      {showModal && <PaymentModal handleHideModal={hideModal} paymentModeDetails={paymentMode} />}
    </>
  );
}
*/

const ReusableTable = ({
  tableContentType = "tags", // tags or paymentModes
  isFetching,
  isFetchingText,
  fallbackText,
  headersArray,
  rowsArray,
  rowStateUpdateFunction,
}) => {
  return (
    <div className={styles["reusable-table-layout"]}>
      {isFetching && <h1>{isFetchingText}</h1>}
      {!isFetching && rowsArray.length === 0 && <h1>{fallbackText}</h1>}
      {!isFetching && rowsArray.length !== 0 && (
        <table className={styles["reusable-table-table"]}>
          <tbody>
            <tr>
              {headersArray.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
            {rowsArray.map((rowItem) => {
              if (tableContentType === "tags")
                return (
                  <CreateTagTableRow
                    tag={rowItem}
                    key={rowItem._id}
                    displayUpdatedTags={rowStateUpdateFunction}
                  />
                );
              // TODO: Implement when working with paymentModes
              else return <></>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReusableTable;
