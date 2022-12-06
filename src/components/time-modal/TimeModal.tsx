import cx from "classnames";

import { useModal } from "@/helpers/useModal";

import type { CounterProps } from "@/components/counter/Counter";

import styles from "./styles.module.scss";

interface TimeModalProps extends CounterProps {
  text: string;
}

const TimeModal = (props: TimeModalProps) => {
  const { text, value, onSave } = props;
  const { isOpened, handleOpen, handleClose } = useModal({});

  const handleSave = (count: number) => {
    onSave(count);
    handleClose();
  };

  return (
    <>
      <button
        disabled={isOpened}
        className={styles.layout}
        onClick={handleOpen}
      >
        <div className={cx(styles.number, "text-white text-bold")}>{value}</div>
        <div className={cx(styles.text, "text-white")}>{text}</div>
      </button>
      <ModalContainer isOpened={isOpened} onClose={handleClose}>
        <div className={styles.wrap}>
          <Counter {...props} onSave={handleSave} />
        </div>
      </ModalContainer>
    </>
  );
};

export default TimeModal;
