import cx from "classnames";

import styles from "../Pointer.module.scss";

interface PointProps {
  isActive: boolean;
}

const Point = ({ isActive = false }: PointProps) => {
  return (
    <div
      className={cx(styles.point, {
        [styles.pointActive]: isActive,
      })}
    />
  );
};

export default Point;
