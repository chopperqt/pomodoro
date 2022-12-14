import { useDispatch, useSelector } from "react-redux";

import { getAutoStart, onSetAutoStart } from "@/service/settings";

import styles from "../styles.module.scss";

const AUTO_START_TEXT = "AUTO-START";

export const AutoStart = () => {
  const dispatch = useDispatch();
  const isAutoState = useSelector(getAutoStart);

  const handleToggle = (value: boolean) => {
    console.log(value);

    dispatch(onSetAutoStart(value));
  };

  return (
    <div className={styles.autoStart}>
      {AUTO_START_TEXT}
      <Switcher isEnable={isAutoState} onToggle={handleToggle} />
    </div>
  );
};
