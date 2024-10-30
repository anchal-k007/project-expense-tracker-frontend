import { useContext } from "react";
import styles from "./ReusableTable.module.css";

const ReusableTable = ({
  isFetching,
  isFetchingText,
  fallbackText,
  headersArray,
  rowsArray,
  tableRowsCreatorFunction,
  editButtonFunction,
  checkErrorsFunction,
}) => {
  return (
    <div className={styles["reusable-table-layout"]}>
      {isFetching && <h1>{isFetchingText}</h1>}
      {!isFetching && rowsArray.length !== 0 && (
        <table className={styles["reusable-table-table"]}>
          <tbody>
            <tr>
              {headersArray.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
            {rowsArray.map((rowItem) => {
              return <>{tableRowsCreatorFunction(rowItem)}</>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReusableTable;
