import cx from "classnames";

import styles from "../Timer.module.scss";

const OPEN_MENU_TEXT = " - Open the setting menu";
const START_TEXT = " - Start/Pause the Pomodoro";

export const Hotkeys = () => {
  return (
    <div className={styles.textLayout}>
      <div className={cx(styles.text, "test-secondary")}>
        <span className={cx(styles.textKey, styles.textKeyEnter)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </span>
        {START_TEXT}
      </div>
      <div className={cx(styles.text, "text-secondary")}>
        <span className={cx(styles.textWrap, "text-bold text-white")}>
          <span className={cx(styles.textKey, styles.textKeyShift)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1h2.846z" />
            </svg>
          </span>
          +<span className={styles.textKey}>K</span>
        </span>
        {OPEN_MENU_TEXT}
      </div>
    </div>
  );
};
