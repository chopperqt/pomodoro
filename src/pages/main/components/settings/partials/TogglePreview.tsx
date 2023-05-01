import cx from 'classnames'

import styles from "../Settings.module.scss";

interface TogglePreviewProps {
  isActive: boolean
  onToggle: (value: boolean) => void
  label: string
}

export const TogglePreview = ({
  isActive,
  onToggle,
  label,
}: TogglePreviewProps) => (
  <div className={styles.wrapper}>
    <div className={cx(styles.wrapperText, "text-bold")}>{label}</div>
    <Switcher
      isEnable={isActive}
      onToggle={onToggle}
    />
  </div>
);
