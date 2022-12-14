import cx from "classnames";

import styles from "./Button.module.scss";

interface ButtonProps extends React.ComponentProps<"button"> {
  isDisabled?: boolean;
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

const Button = ({ isDisabled = false, children, className }: ButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      className={cx(styles.button, className, {
        [styles.buttonDisabled]: isDisabled,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
