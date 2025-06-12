import {
  faPause,
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import {
  Timer,
  Button,
  StatusKey,
} from "./components";
import {
  PomodoroStatusKey,
  TimerStatusKey,
  usePomodoro,
} from "./hooks/use-pomodoro";

import "./App.css";

const POMODORO_TEXT = 'Pomodoro Time'
const BREAK_TEXT = 'Break Time'

function App() {
  const {
    isStartPosition,
    pomodoroStatus,
    timerStatus,
    minutes,
    seconds,
    handleStop,
    handleToggle,
  } = usePomodoro()

  // async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  // setGreetMsg(await invoke("greet", { name }));
  // }

  const text = pomodoroStatus === PomodoroStatusKey.PMODORO ? POMODORO_TEXT : BREAK_TEXT
  const icon = timerStatus === TimerStatusKey.INACTIVE ? faPlay : faPause

  const isEnableStop = timerStatus === TimerStatusKey.ACTIVE || !isStartPosition

  return (
    <main className="container text-center flex flex-col items-center gap-3">
      <h1 className="text-2xl text-gray-600 font-bold">{text}</h1>
      <div className="flex gap-4">
        <Timer timer={minutes} />
        <Timer timer={seconds} />
      </div>
      <div className="flex gap-3">
        <Button
          icon={faStop}
          onClick={handleStop}
          status={StatusKey.DANGER}
          isDisabled={!isEnableStop}
        />
        <Button
          icon={icon}
          onClick={handleToggle}
        />
      </div>
    </main>
  );
}

export default App;
