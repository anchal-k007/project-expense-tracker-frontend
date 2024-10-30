import styles from "./ProfileSection.module.css";

const ProfileSection = ({ children , title }) => {
  return (
    <section className={styles["profile-section"]}>
      <h1 className={styles["profile-section-title"]}>{title}</h1>
      {children}
      <hr/>
    </section>
  );
};

export default ProfileSection;