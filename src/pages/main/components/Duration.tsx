import { TimeModal } from "@/components";
import {
  getAmountOfRepeats,
  getTime,
  getTimeout,
  onSetTime,
  onSetTimeout,
  onSetAmountOfRepeats,
} from "@/service/settings";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import styles from "../styles.module.scss";
import { Times } from "../constants";

const DURATION_TEXT = "Duration";
const POMODORO_TEXT = "Pomodoro";
const TIMEOUT_TEXT = "Timeout";
const AMOUNT_OF_REPEATS_TEXT = "Amount of Repeats";

interface DurationProps {
  isMenuOpen: boolean;
}
const Duration = ({ isMenuOpen = false }: DurationProps) => {
  const time = useSelector(getTime);
  const timeout = useSelector(getTimeout);
  const amountOfRepeats = useSelector(getAmountOfRepeats);

  const dispatch = useDispatch();

  const handleSetTime = (time: number) => {
    dispatch(onSetTime(time));
  };

  const handleSetTimeout = (timeout: number) => {
    dispatch(onSetTimeout(timeout));
  };

  const handleSetAmountOfRepeats = (amountOfRepeats: number) => {
    dispatch(onSetAmountOfRepeats(amountOfRepeats));
  };

  return (
    <div className={styles.durationLayout}>
      <div>{DURATION_TEXT}</div>
      <div
        className={cx(styles.duration, {
          "no-click": !isMenuOpen,
        })}
      >
        <TimeModal
          value={time}
          text={POMODORO_TEXT}
          onSave={handleSetTime}
          min={25}
          max={60}
          step={1}
        />
        <TimeModal
          value={timeout}
          text={TIMEOUT_TEXT}
          onSave={handleSetTimeout}
          min={5}
          max={60}
          step={1}
        />
        <TimeModal
          value={amountOfRepeats}
          text={AMOUNT_OF_REPEATS_TEXT}
          onSave={handleSetAmountOfRepeats}
          min={0}
          max={60}
          step={1}
        />
      </div>
    </div>
  );
};

export default Duration;
