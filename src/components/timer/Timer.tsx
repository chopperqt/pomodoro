import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import cx from "classnames";

import { getAmountOfRepeats, getTime, getTimeout } from "@/service/settings";
import { useTimer } from "./hooks/useTimer";

import styles from "./Timer.module.scss";
import { Hotkeys } from "./partials/Hotkeys";

const OPEN_MENU_TEXT = " - Open the setting menu";
const START_TEXT = " - Start/Pause the Pomodoro";

const Timer = () => {
  const time = useSelector(getTime);
  const timeout = useSelector(getTimeout);
  const amountOfRepeats = useSelector(getAmountOfRepeats);

  const {
    timer,
    dispSecondsAsMins,
    isStarted,
    handleToggleTimer,
    amountOfCompletedPoints,
  } = useTimer({
    time,
    timeout,
    amountOfRepeats,
  });

  let icon = faPlay;
  let text = "Start";

  if (isStarted) {
    icon = faPause;
    text = "Pause";
  }

  return (
    <div className={styles.layout}>
      <Pointer
        amountOfCompletePoints={amountOfCompletedPoints}
        amountOfPoints={amountOfRepeats}
      />
      <div className={styles.timer}>{dispSecondsAsMins(timer)}</div>
      <motion.button
        onClick={handleToggleTimer}
        className={styles.button}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
      >
        <FontAwesomeIcon icon={icon} />
        {text}
      </motion.button>
      <Hotkeys />
    </div>
  );
};

export default Timer;
