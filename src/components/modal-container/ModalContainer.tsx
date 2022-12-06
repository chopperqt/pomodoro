import Modal from "react-modal";

import styles from "./ModalContainer.module.scss";

interface ModalContainerProps {
  isOpened?: boolean;
  onClose: () => void;
  children: React.ReactElement | React.ReactElement[];
  shouldCloseOnOverlayClick?: boolean;
  appElement?: HTMLElement;
}
const ModalContainer = ({
  isOpened = false,
  onClose,
  children,
  shouldCloseOnOverlayClick,
  appElement,
}: ModalContainerProps) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpened}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.content}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      appElement={document.querySelectorAll("body")[0]}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
