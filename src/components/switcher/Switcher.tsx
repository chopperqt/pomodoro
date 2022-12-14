import cx from "classnames";
import { useSwitcher } from "./hook/useSwitcher";

import styles from "./Switcher.module.scss";

const ENABLE_TEXT = "ENABLE";
const DISABLE_TEXT = "DISABLE";

interface SwitcherProps {
  isEnable?: boolean;
}
const Switcher = ({ isEnable = false }: SwitcherProps) => {
  const { enableRef, disableRef, isEnabled } = useSwitcher();

  return (
    <div className={styles.layout}>
      <button
        ref={enableRef}
        className={cx(styles.button, {
          [styles.buttonActive]: isEnabled,
        })}
      >
        {ENABLE_TEXT}
      </button>
      <button
        ref={disableRef}
        className={cx(styles.button, {
          [styles.buttonActive]: !isEnabled,
        })}
      >
        {DISABLE_TEXT}
      </button>
    </div>
  );
};

export default Switcher;
