import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import cx from "classnames";

import {
  getAmountOfRepeats,
  getMenuStatus,
  getTime,
  getTimeout,
} from "@/service/settings";
import { ThemeContext, Themes } from "@/context/ThemeContext";

import { Hotkeys } from "./partials/Hotkeys";
import { getFormateTime } from "../../helpers/getFormateTime";
import { useTimers } from "../../hooks/useTimers";
import { getOpacity } from "../../helpers/getOpacity";
import { useTimer } from "../../hooks/useTimer";

import styles from "./Timer.module.scss";
import { Animations } from "../../constants";

const defaultAnimate = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.1 },
};

export const Timers = () => {
  const time = useSelector(getTime);
  const timeout = useSelector(getTimeout);
  const amountOfRepeats = useSelector(getAmountOfRepeats);
  const isMenuOpen = useSelector(getMenuStatus);

  const {
    handleToggle: handleTogglePomodoro,
    handleReset: handleResetPomodoro,
    timer: timerPomodoro,
    isFinished: isFinishedPomodoro,
    isStarted: isStartedPomodoro,
  } = useTimer({
    time,
  });

  const {
    handleToggle: handleToggleTimeout,
    handleReset: handleResetTimeout,
    timer: timerTimeout,
    isStarted: isStartedTimeout,
    isFinished: isFinishedTimeout,
  } = useTimer({ time: timeout });

  const { handleToggle, amountOfCompletedPoints, handleReset } = useTimers({
    amountOfRepeats,
    isPomodoro: isStartedPomodoro,
    isTimeout: isStartedTimeout,
    timerPomodoro,
    timerTimeout,
    isFinishedPomodoro,
    isFinishedTimeout,
    handleToggleTimeout,
    handleTogglePomodoro,
    handleResetPomodoro,
    handleResetTimeout,
  });

  let icon = faPlay;
  let text = "Start";

  const isStart = isStartedPomodoro || isStartedTimeout;

  if (isStart) {
    icon = faPause;
    text = "Pause";
  }

  const formattedTimeout = getFormateTime(timerTimeout);
  const formattedPomodoro = getFormateTime(timerPomodoro);

  return (
    <div
      className={cx(styles.layout, {
        [styles.layoutDisable]: isMenuOpen,
      })}
    >
      <Pointer
        amountOfCompletePoints={amountOfCompletedPoints}
        amountOfPoints={amountOfRepeats}
      />
      <motion.div
        animate={Animations.timer}
        className={cx(styles.timer, "text-white", {
          [styles.timerDisabled]: isFinishedPomodoro,
        })}
      >
        {formattedPomodoro}
      </motion.div>
      <motion.div
        animate={Animations.timeout}
        className={cx(styles.timerTimeout, "text-white", {
          [styles.timerTimeoutDisabled]: !isFinishedPomodoro,
        })}
      >
        {formattedTimeout}
      </motion.div>
      <motion.div animate={Animations.actions} className={styles.buttonWrap}>
        <motion.button
          onClick={handleToggle}
          className={styles.button}
          {...defaultAnimate}
        >
          <FontAwesomeIcon icon={icon} />
          <div className={styles.buttonText}>{text}</div>
        </motion.button>
        <motion.button
          className={cx(styles.button, styles.buttonRestart, {
            [styles.buttonDisabled]: isStart,
          })}
          onClick={handleReset}
          disabled={isStart}
          {...defaultAnimate}
        >
          <FontAwesomeIcon icon={faRefresh} />
        </motion.button>
      </motion.div>
      <Hotkeys />
    </div>
  );
};
