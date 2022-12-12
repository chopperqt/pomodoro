import styles from "./Switcher.module.scss";

const ENABLE_TEXT = "ENABLE";
const DISABLE_TEXT = "DISABLE";

const Switcher = () => {
  return (
    <div className={styles.layout}>
      <button className={styles.button}>{ENABLE_TEXT}</button>
      <button className={styles.button}>{DISABLE_TEXT}</button>
    </div>
  );
};

export default Switcher;
