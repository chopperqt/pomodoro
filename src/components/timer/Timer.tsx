import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import { getAmountOfRepeats, getTime, getTimeout } from "@/service/settings";
import { useTimer } from "./hooks/useTimer";
import { Hotkeys } from "./partials/Hotkeys";

import styles from "./Timer.module.scss";
import { ThemeContext } from "@/context/ThemeContext";

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
      {({ setTheme }) => {
        setTheme(isTimeout.current ? "green" : "red");

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
      }}
    </ThemeContext.Consumer>
  );
};

export default Timer;
