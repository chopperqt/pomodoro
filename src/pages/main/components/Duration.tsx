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

const DURATION_TEXT = "Duration";
const POMODORO_TEXT = "Pomodoro";
const TIMEOUT_TEXT = "Timeout";
const AMOUNT_OF_REPEATS_TEXT = "Amount of Repeats";

interface DurationProps {
  isMenuOpen: boolean;
}
export const Duration = ({ isMenuOpen = false }: DurationProps) => {
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
        <div>
          <div>{POMODORO_TEXT}</div>
          <CounterV2
            min={25}
            max={60}
            value={30}
            onChange={() => { }}
          />
        </div>
        <div>
          <div>{TIMEOUT_TEXT}</div>
          <CounterV2
            min={5}
            max={60}
            value={5}
            onChange={() => { }}
          />
        </div>
        <div>
          <div>{AMOUNT_OF_REPEATS_TEXT}</div>
          <CounterV2
            min={3}
            max={10}
            value={3}
            onChange={() => { }}
          />
        </div>
      </div>
    </div>
  );
};
