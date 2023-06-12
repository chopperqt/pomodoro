import { motion } from "framer-motion";

import { getRandomArray } from "@/helpers/getRandomArray";

import Point from "./partials/Point";

import styles from "./Pointer.module.scss";

interface PointerProps {
  amountOfPoints: number;
  amountOfCompletePoints: number;
}

const Pointer = memo(
  ({ amountOfCompletePoints, amountOfPoints }: PointerProps) => {
    const arrayOfPoint = getRandomArray(amountOfPoints);

    return (
      <motion.div
        animate={{
          opacity: [0, 1],
          y: [20, 0],
        }}
        className={styles.layout}
      >
        {arrayOfPoint.map(({}, index) => (
          <Point key={index} isActive={index + 1 <= amountOfCompletePoints} />
        ))}
      </motion.div>
    );
  }
);

export default Pointer;
