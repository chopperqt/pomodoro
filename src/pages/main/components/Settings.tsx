import { SideBar } from "@/components";
import { Duration } from "./Duration";
import { AutoStart } from "./AutoStart";

import styles from "../styles.module.scss";
import { useSettings } from "../hooks/useSettings";

const Settings = () => {
  const { isOpened, toggleOpen, isSettingsDisabled } = useSettings();

  return (
    <SideBar
      isOpened={isOpened}
      onToggle={toggleOpen}
      isDisabled={isSettingsDisabled}
    >
      <Checkbox />
      <div className={styles.settingsLayout}>
        <Duration isMenuOpen={isOpened} />
        <AutoStart />
      </div>
    </SideBar>
  );
};

export default Settings;
