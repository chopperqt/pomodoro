import { ThemeContext } from "@/context/ThemeContext";

import { Burger } from "../partials/burger";

import styles from "../styles.module.scss";

export const MenuToggle = ({ toggle, isDisabled }: any) => (
  <button
    onClick={toggle}
    className={styles.toggleButton}
    disabled={isDisabled}
  >
    <ThemeContext.Consumer>
      {(context: any) => {
        const stroke = context.theme === "green" ? "#4CAF50" : "#F44336";

        return <Burger stroke={stroke} />;
      }}
    </ThemeContext.Consumer>
  </button>
);
