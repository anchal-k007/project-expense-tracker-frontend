import ResizableBox from "../ResizableBox";
import styles from "./DisplayBlock.module.css";

const DisplayBlock = ({ title, data }) => {
  return (
    <ResizableBox width={250} height={125}>
      <div className={styles["display-block"]}>
        <h1>{title}</h1>
        <span>{data}</span>
      </div>
    </ResizableBox>
  );
};

export default DisplayBlock;
