import cx from 'classnames'

import styles from '../Settings.module.scss'

interface CounterPreviewProps {
  min: number
  max: number
  label: string
  value: number
  onChange: (value: number) => void
}

export const CounterPreview = ({
  min,
  max,
  label,
  value,
  onChange,
}: CounterPreviewProps) => (
  <div className={styles.wrapper}>
    <div className={cx(styles.wrapperText, "text-bold")}>{label}</div>
    <CounterV2
      min={min}
      max={max}
      value={value}
      onChange={onChange}
    />
  </div>
)
