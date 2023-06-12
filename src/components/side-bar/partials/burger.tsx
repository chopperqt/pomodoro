import { motion } from "framer-motion";

import styles from "../styles.module.scss";

const defaultOptions = {
  fill: "transparent",
  strokeWidth: "3",
  stroke: "#FFF",
};

export const Burger = ({ toggle, isDisabled }: any) => (
  <button
    onClick={toggle}
    className={styles.toggleButton}
    disabled={isDisabled}
  >
    <svg width="18" color="transparent" height="18" viewBox="0 0 23 23">
      <motion.path
        strokeLinecap="round"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        {...defaultOptions}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        strokeLinecap="round"
        {...defaultOptions}
      />
      <motion.path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        strokeLinecap="round"
        {...defaultOptions}
      />
    </svg>
  </button>
);
