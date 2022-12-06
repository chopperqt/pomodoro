import { getRandomArray } from "@/helpers/getRandomArray";
import Point from "./partials/Point";

import styles from "./Pointer.module.scss";

interface PointerProps {
  amountOfPoints: number;
  amountOfCompletePoints: number;
}

const Pointer = ({ amountOfCompletePoints, amountOfPoints }: PointerProps) => {
  const arrayOfPoint = getRandomArray(amountOfPoints);

  return (
    <div className={styles.layout}>
      {arrayOfPoint.map(({}, index) => (
        <Point key={index} isActive={index + 1 <= amountOfCompletePoints} />
      ))}
    </div>
  );
};

export default Pointer;
