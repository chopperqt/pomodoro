import cx from "classnames";

import styles from "../Timer.module.scss";

const OPEN_MENU_TEXT = "Open the setting menu";
const START_TEXT = "Start/Pause the Pomodoro";

export const Hotkeys = () => {
  return (
    <div className={styles.textLayout}>
      <div className={cx(styles.text, "test-secondary")}>
        {START_TEXT}
        <span className={cx(styles.textKey, styles.textKeyEnter)}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            enable-background="new 0 0 24 24"
            fill="currentColor"
          >
            <path d="M21,9c-0.6,0-1,0.4-1,1v3H4v-3c0-0.6-0.4-1-1-1s-1,0.4-1,1v4c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1v-4C22,9.4,21.6,9,21,9z" />
          </svg>
        </span>
      </div>
      <div className={cx(styles.text, "text-secondary")}>
        {OPEN_MENU_TEXT}
        <span className={cx(styles.textWrap, "text-bold text-white")}>
          <span className={cx(styles.textKey, styles.textKeyShift)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5 8 2.731 1.654 9.5H4.5a1 1 0 0 1 1 1v3h5v-3a1 1 0 0 1 1-1h2.846z" />
            </svg>
          </span>
          +<span className={styles.textKey}>K</span>
        </span>
      </div>
    </div>
  );
};
