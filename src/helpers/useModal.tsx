interface UseModalProps {
  shouldOpen?: boolean;
  onOpenCallback?: () => void;
  onCloseCallback?: () => void;
}

export const useModal = ({
  shouldOpen = false,
  onOpenCallback = () => {},
  onCloseCallback = () => {},
}: UseModalProps) => {
  const [isOpened, setOpened] = useState<boolean>(shouldOpen);

  const handleOpen = () => {
    if (isOpened) {
      return;
    }

    setOpened(true);
    onOpenCallback();
  };

  const handleClose = () => {
    setOpened(false);
    onCloseCallback();
  };

  return {
    isOpened,
    handleClose,
    handleOpen,
  };
};
