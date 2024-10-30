import { useContext } from "react";
import styles from "./ReusableTable.module.css";

const ReusableTable = ({
  isLoading,
  isLoadingText,
  fallbackText,
  headersArray,
  rowsArray,
  tableRowsCreatorFunction,
  editButtonFunction,
  checkErrorsFunction,
}) => {
  return (
    <div className={styles["reusable-table-layout"]}>
      {isLoading && <h1>{isLoadingText}</h1>}
      {!isLoading && rowsArray.length !== 0 && (
        <table className={styles["reusable-table-table"]}>
          <tbody>
            <th>
              {headersArray.map((header) => (
                <tr>{header}</tr>
              ))}
            </th>
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
