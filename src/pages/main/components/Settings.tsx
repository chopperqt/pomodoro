import { useDispatch } from "react-redux";
import { useCycle } from "framer-motion";

import { SideBar } from "@/components";
import { onSetMenuOpen } from "@/service/settings";
import Duration from "./Duration";
import { AutoStart } from "./AutoStart";

import styles from "../styles.module.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const [isOpened, toggleOpen] = useCycle(false, true);
  const hotKeyRef = useRef<boolean>(false);

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
    window.addEventListener("keydown", (e) => {
      handleHotKeyEvent(e);
    });
  }, []);

  useEffect(() => {
    dispatch(onSetMenuOpen(isOpened));
  }, [isOpened]);

  return (
    <SideBar isOpened={isOpened} onToggle={toggleOpen}>
      <div className={styles.settingsLayout}>
        <Duration isMenuOpen={isOpened} />
        <AutoStart />
      </div>
    </SideBar>
  );
};

export default Settings;
