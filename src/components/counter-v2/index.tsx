import cx from 'classnames'

import styles from './Counter.module.scss'
import { useCounter } from './hooks/useCounter';

const DECREASE_TEXT = 'Decrease'
const INCREASE_TEXT = 'Increase'

interface CounterProps {
  value: number;
  onChange: (value: number) => void
  min: number
  max: number
}

const Counter = ({
  value,
  onChange,
  min,
  max,
}: CounterProps) => {
  const {
    currentValue,
    handleDecrease,
    handleIncrase,
  } = useCounter({
    min,
    max,
    onChange,
    value,
  })
  return (
    <div className={styles.layout}>
      <button
        className={styles.button}
        onClick={handleDecrease}
      >
        {DECREASE_TEXT}
      </button>
      <div className={cx(styles.text, "text-white text-bold")}>{currentValue}</div>
      <button
        className={styles.button}
        onClick={handleIncrase}
      >
        {INCREASE_TEXT}
      </button>
    </div>
  )
}

export default Counter;
