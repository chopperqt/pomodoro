import { useCycle } from "framer-motion";

export const useSettings = () => {
  const [isOpened, toggleOpen] = useCycle(false, true);

  return {
    isOpened,
    toggleOpen,
  };
};
