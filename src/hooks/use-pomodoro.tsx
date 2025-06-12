import { getCurrentWindow } from '@tauri-apps/api/window'
import {
  useCallback,
  useEffect,
  useState,
} from "react";

const DEFAULT_SECS = 60;
const DELAY = 1000;
const BREAK_TIMER = Number(import.meta.env.VITE_BREAK_TIME);
const POMODORO_TIME = Number(import.meta.env.VITE_POMODORO_TIME);

export const PomodoroStatusKey = {
  PMODORO: "pomodoro",
  BREAK: "break",
} as const

export const TimerStatusKey = {
  ACTIVE: "active",
  INACTIVE: "inactive",
}

export const usePomodoro = () => {
  const [pomodoroStatus, setPomodoroSatus] = useState<typeof PomodoroStatusKey[keyof typeof PomodoroStatusKey]>(PomodoroStatusKey.PMODORO);
  const [timerStatus, setTimerStatus] = useState<typeof TimerStatusKey[keyof typeof TimerStatusKey]>(TimerStatusKey.INACTIVE);
  const [timer, setTimer] = useState(POMODORO_TIME);

  const minutes = Math.floor(timer / DEFAULT_SECS);
  const seconds = timer % DEFAULT_SECS;

  let intervalId: number | undefined;

  const playSound = () => {
    const sound = new Audio('/public/sound.mp3')

    sound.play()
  }
  const startTimer = useCallback(() => {
    intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, DELAY);

    setTimerStatus(TimerStatusKey.ACTIVE);
  }, [])

  const stopTimer = useCallback(() => {
    clearInterval(intervalId);
    setTimerStatus(TimerStatusKey.INACTIVE);
  }, [])

  const isStartPosition = timer === POMODORO_TIME

  useEffect(() => {
    if (timer > 0) {
      return
    }

    stopTimer()


    playSound()
    getCurrentWindow().show()
    getCurrentWindow().unminimize()
    getCurrentWindow().setFocus()

    if (pomodoroStatus === PomodoroStatusKey.PMODORO) {
      setPomodoroSatus(PomodoroStatusKey.BREAK);
      setTimer(BREAK_TIMER);

      return
    }

    setPomodoroSatus(PomodoroStatusKey.PMODORO);
    setTimer(POMODORO_TIME);
  }, [timer])

  const handleToggle = () => {
    if (timerStatus === TimerStatusKey.ACTIVE) {
      stopTimer();

      return
    }

    startTimer();
  }

  const handleStop = () => {
    stopTimer()
    setTimer(POMODORO_TIME)
  }

  return {
    isStartPosition,
    timerStatus,
    pomodoroStatus,
    minutes,
    seconds,
    handleToggle,
    handleStop,
  }
}
