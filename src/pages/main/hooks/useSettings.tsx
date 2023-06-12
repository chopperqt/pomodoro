import { useDispatch, useSelector } from "react-redux";

import {
  getMenuStatus,
  onSetMenuOpen,
  getSettingsDisabled,
} from "@/service/settings";

export const useSettings = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(getMenuStatus);
  const isSettingsDisabled = useSelector(getSettingsDisabled);

  const hotKeyRef = useRef<boolean>(false);

  const toggleOpen = () => {
    dispatch(onSetMenuOpen(!isOpened));
  };

  const handleHotKeyEvent = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Shift") hotKeyRef.current = true;

    if (e.key === "K" && hotKeyRef) {
      toggleOpen();

      return;
    }

    hotKeyRef.current = false;
  };

  useEffect(() => {
    if (isSettingsDisabled) {
      return;
    }

    window.addEventListener("keydown", handleHotKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleHotKeyEvent);
    };
  }, [isOpened, isSettingsDisabled]);

  return {
    isOpened,
    toggleOpen,
    isSettingsDisabled,
  };
};
