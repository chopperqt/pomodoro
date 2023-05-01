import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import cx from "classnames";

import { getAmountOfRepeats, getTime, getTimeout } from "@/service/settings";
import { useTimer } from "./hooks/useTimer";
import { Hotkeys } from "./partials/Hotkeys";
import { ThemeContext } from "@/context/ThemeContext";

import styles from "./Timer.module.scss";
import { getFormateTime } from "./helpers/getFormateTime";
import { useTimers } from "./hooks/useTimers";

const defaultAnimate = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.1 },
};

const Timer = () => {
  const time = useSelector(getTime);
  const timeout = useSelector(getTimeout);
  const amountOfRepeats = useSelector(getAmountOfRepeats);

  // const {
  //   timer,
  //   isStarted,
  //   handleToggleTimer,
  //   amountOfCompletedPoints,
  //   isTimeout,
  //   start,
  //   handleReset,
  // } = useTimer({
  //   time,
  //   timeout,
  //   amountOfRepeats,
  // });

  const {
    handleToggle: handleTogglePomodoro,
    handleReset: handleResetPomodoro,
    timer: timerPomodoro,
    isFinished: isFinishedPomodoro,
    isStarted: isStartedPomodoro,
  } = useTimer({
    time,
  })

  const {
    handleToggle: handleToggleTimeout,
    handleReset: handleResetTimeout,
    timer: timerTimeout,
    isStarted: isStartedTimeout,
    isFinished: isFinishedTimeout,
  } = useTimer({ time: timeout })

  const {
    handleToggle,
    amountOfCompletedPoints
  } = useTimers({
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
  })
  let icon = faPlay;
  let text = "Start";

  if (isStartedPomodoro || isStartedTimeout) {
    icon = faPause;
    text = "Pause";
  }

  const formattedTimeout = getFormateTime(timerTimeout)
  const formattedPomodoro = getFormateTime(timerPomodoro)

  return (
    <ThemeContext.Consumer>
      {(context: any) => {
        //context?.setTheme(isTimeout.current ? "green" : "red");

        return (
          <div className={styles.layout}>
            <Pointer
              amountOfCompletePoints={amountOfCompletedPoints}
              amountOfPoints={amountOfRepeats}
            />
            <div className={cx(styles.timer, {
              "text-white": !isStartedPomodoro,
              "text-secondary-color": isStartedPomodoro,
            })}>
              {formattedPomodoro}
            </div >
            <div className={cx(styles.timerTimeout, {
              "text-white": isStartedPomodoro,
              "text-secondary-color": isStartedPomodoro,
            })}
            >
              {formattedTimeout}
            </div>
            <div className={styles.buttonWrap}>
              <motion.button
                onClick={handleToggle}
                className={styles.button}
                {...defaultAnimate}
              >
                <FontAwesomeIcon icon={icon} />
                {text}
              </motion.button>
              <motion.button
                className={cx(styles.button, styles.buttonRestart, {
                  [styles.buttonDisabled]: isStartedPomodoro,
                })}
                onClick={() => { }}
                disabled={isStartedPomodoro}
                {...defaultAnimate}
              >
                <FontAwesomeIcon icon={faRefresh} />
              </motion.button>
            </div>
            <Hotkeys />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Timer;
