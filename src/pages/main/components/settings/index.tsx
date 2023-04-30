import { onSetAmountOfRepeats, onSetTime, onSetTimeout } from "@/service/settings"
import { useDispatch } from "react-redux"
import { TimerKey, Timers } from "../../constants"
import { useSettings } from "../../hooks/useSettings"
import { CounterPreview } from "./partials/CounterPreview"
import { TogglePreview } from "./partials/TogglePreview"

import styles from './Settings.module.scss'

const AUTOSTART_TEXT = 'Auto-start'

export const Settings = () => {
  const dispatch = useDispatch()

  const { isOpened, toggleOpen, isSettingsDisabled } = useSettings()

  return (
    <SideBar
      isOpened={isOpened}
      isDisabled={isSettingsDisabled}
      onToggle={toggleOpen}
    >
      <div className={styles.layout}>
        <CounterPreview
          {...Timers[TimerKey.pomodoro]}
          onChange={(value) => dispatch(onSetTime(value))}
        />
        <CounterPreview
          {...Timers[TimerKey.timeout]}
          onChange={(value) => dispatch(onSetTimeout(value))}
        />
        <CounterPreview
          {...Timers[TimerKey.repeats]}
          onChange={(value) => dispatch(onSetAmountOfRepeats(value))}
        />
        <TogglePreview
          label={AUTOSTART_TEXT}
          isActive={false}
          onToggle={() => { }}
        />
      </div>
    </SideBar>

  )
}
