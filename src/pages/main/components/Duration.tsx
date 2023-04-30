import {
  onSetTime,
  onSetTimeout,
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

  const dispatch = useDispatch();

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
            value={25}
            onChange={(value: number) => dispatch(onSetTime(value))}
          />
        </div>
        <div>
          <div>{TIMEOUT_TEXT}</div>
          <CounterV2
            min={5}
            max={60}
            value={5}
            onChange={(value) => dispatch(onSetTimeout(value))}
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
