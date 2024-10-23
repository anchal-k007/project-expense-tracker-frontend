import ResizableBox from "./ResizableBox";
import styles from "./DisplayBlock.module.css";

const DisplayBlock = ({ title, data, text }) => {
  return (
    <ResizableBox width={400} height={200}>
      <div className={styles["display-block"]}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.data}>{data}</span>
        <p className={styles.text}>{text}</p>
      </div>
    </ResizableBox>
  );
};

export default DisplayBlock;
