import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCheck } from "@fortawesome/free-solid-svg-icons";

import cx from "classnames";

import { useCounter } from "./hooks/useCounter";

import styles from "./Counter.module.scss";

export interface CounterProps {
  step: number;
  min: number;
  max: number;
  value: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onSave: (value: number) => void;
}
const Counter = ({
  onIncrease,
  onDecrease,
  step = 1,
  min = 0,
  max,
  value,
  onSave = () => {},
}: CounterProps) => {
  const {
    formattedValue,
    handleDecrease,
    handleIncrease,
    isDisabledDecrease,
    isDisabledIncrease,
    counterRef,
  } = useCounter({
    value,
    max,
    min,
    onDecrease,
    onIncrease,
    step,
    onSave,
  });

  return (
    <div className={styles.counter} ref={counterRef}>
      <div className={styles.wrap}>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={isDisabledDecrease}
          className={cx(styles.button, {
            [styles.buttonDisabled]: isDisabledDecrease,
          })}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div className={styles.text}>{formattedValue}</div>
        <button
          type="button"
          onClick={handleIncrease}
          disabled={isDisabledIncrease}
          className={cx(styles.button, {
            [styles.buttonDisabled]: isDisabledIncrease,
          })}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => onSave(formattedValue)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
};

export default Counter;
