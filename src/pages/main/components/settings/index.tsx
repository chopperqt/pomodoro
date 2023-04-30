import { onSetAmountOfRepeats, onSetTime, onSetTimeout } from "@/service/settings"
import { useDispatch } from "react-redux"
import { TimerKey, Timers } from "../../constants"
import { useSettings } from "../../hooks/useSettings"
import { CounterPreview } from "./partials/CounterPreview"

export const Settings = () => {
  const dispatch = useDispatch()

  const { isOpened, toggleOpen, isSettingsDisabled } = useSettings()

  return (
    <SideBar
      isOpened={isOpened}
      isDisabled={isSettingsDisabled}
      onToggle={toggleOpen}
    >
      <div>
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
      </div>
    </SideBar>

  )
}
