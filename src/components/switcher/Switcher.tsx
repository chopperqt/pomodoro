import cx from "classnames";
import { useSwitcher } from "./hook/useSwitcher";

import styles from "./Switcher.module.scss";

const ENABLE_TEXT = "ENABLE";
const DISABLE_TEXT = "DISABLE";

export interface SwitcherProps {
  isEnable: boolean;
  onToggle: (value: boolean) => void;
}
const Switcher = ({ isEnable = false, onToggle }: SwitcherProps) => {
  const {
    enableRef,
    disableRef,
    isEnabled,
    handleSetDisabled,
    handleSetEnabled,
  } = useSwitcher({
    isEnable,
    onToggle,
  });

  return (
    <div className={styles.layout}>
      <button
        ref={enableRef}
        className={cx(styles.button, {
          [styles.buttonActive]: isEnabled,
        })}
        onClick={handleSetEnabled}
      >
        {ENABLE_TEXT}
      </button>
      <button
        ref={disableRef}
        className={cx(styles.button, {
          [styles.buttonActive]: !isEnabled,
        })}
        onClick={handleSetDisabled}
      >
        {DISABLE_TEXT}
      </button>
    </div>
  );
};

export default Switcher;
