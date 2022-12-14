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

const defaultAnimate = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.1 },
};

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
    isTimeout,
    start,
    handleReset,
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
    <ThemeContext.Consumer>
      {(context: any) => {
        context?.setTheme(isTimeout.current ? "green" : "red");

        return (
          <div className={styles.layout}>
            <Pointer
              amountOfCompletePoints={amountOfCompletedPoints}
              amountOfPoints={amountOfRepeats}
            />
            <div className={styles.timer}>{dispSecondsAsMins(timer)}</div>
            <div className={styles.buttonWrap}>
              <motion.button
                onClick={handleToggleTimer}
                className={styles.button}
                {...defaultAnimate}
              >
                <FontAwesomeIcon icon={icon} />
                {text}
              </motion.button>
              <motion.button
                className={cx(styles.button, styles.buttonRestart, {
                  [styles.buttonDisabled]: start,
                })}
                onClick={handleReset}
                disabled={start}
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
