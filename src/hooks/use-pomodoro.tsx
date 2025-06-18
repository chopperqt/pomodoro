import { getCurrentWindow } from '@tauri-apps/api/window'
import {
  useEffect,
  useState,
} from "react";

const DELAY = 800;
const BREAK_TIMER = Number(import.meta.env.VITE_BREAK_TIME);
const POMODORO_TIMER = Number(import.meta.env.VITE_POMODORO_TIME);

export const PomodoroStatusKey = {
  PMODORO: "pomodoro",
  BREAK: "break",
} as const


export const TimerStatusKey = {
  ACTIVE: "active",
  PAUSE: "pause",
  INACTIVE: "inactive",
} as const

type PomodoroStatusOption = typeof PomodoroStatusKey[keyof typeof PomodoroStatusKey]
type TimerStatusOption = typeof TimerStatusKey[keyof typeof TimerStatusKey]

const playSound = () => {
  const sound = new Audio('/sound.mp3')

  sound.play()
}

/**
 * Идентификатор таймера.
 */
let intervalId: number | undefined;

/**
 * Время окончания таймера.
 */
let endTime: number | null = null

/**
 * Время которое прошло, с момента начала таймера.
 */
let passedTime = 0

export const usePomodoro = () => {
  const [pomodoroStatus, setPomodoroSatus] = useState<PomodoroStatusOption>(PomodoroStatusKey.PMODORO);
  const [timerStatus, setTimerStatus] = useState<TimerStatusOption>(TimerStatusKey.INACTIVE);

  const [timer, setTimer] = useState(POMODORO_TIMER)

  const normalizedMinutes = Math.floor(timer / 60 / 1000);
  const normalizedSeoncds = Math.floor(timer / 1000);

  const minutes = normalizedMinutes < 0 ? 0 : normalizedMinutes;
  const seconds = normalizedSeoncds < 0 ? 0 : normalizedSeoncds;

  const isActive = timerStatus === TimerStatusKey.ACTIVE
  const isPause = timerStatus === TimerStatusKey.PAUSE
  const isInactive = timerStatus === TimerStatusKey.INACTIVE
  const isPomodoro = pomodoroStatus === PomodoroStatusKey.PMODORO
  const isBreak = pomodoroStatus === PomodoroStatusKey.BREAK


  const startTimer = () => {
    /**
      * Обновляет состояние теймера.
      */
    setTimerStatus(TimerStatusKey.ACTIVE)

    /**
     * Определяем, таймер помодоро или таймер перерыва.
     */
    const time = isPomodoro ? POMODORO_TIMER : BREAK_TIMER

    /**
      * Определяем конечное время таймера.
      */
    endTime = Date.now() + (passedTime || time)

    setTimer(endTime - Date.now())

    /**
      * Запуск таймера.
      */
    intervalId = setInterval(() => {
      if (!endTime) return

      const remainingTime = endTime - Date.now()

      setTimer(remainingTime)
    }, DELAY);

    setTimerStatus(TimerStatusKey.ACTIVE);
  }

  const pauseTimer = () => {
    setTimerStatus(TimerStatusKey.PAUSE)
    clearInterval(intervalId);

    if (!endTime) return

    passedTime = endTime - Date.now()
  }

  const stopTimer = () => {
    /**
      * Выключаем таймер.
      */
    clearInterval(intervalId);

    passedTime = 0
    endTime = null

    /**
      * Меняем статус на инактивен.
      */
    setTimerStatus(TimerStatusKey.INACTIVE);

    /**
     * Меняем время и режим взависимости от того, какой сейчас стоит режим.
     */

    if (isPomodoro) {
      setTimer(BREAK_TIMER)
      setPomodoroSatus(PomodoroStatusKey.BREAK)

      return
    }

    setTimer(POMODORO_TIMER)
    setPomodoroSatus(PomodoroStatusKey.PMODORO)
  }

  useEffect(() => {
    if (0 < timer) {
      return
    }

    endTime = null

    stopTimer()
    playSound()

    getCurrentWindow().show()
    getCurrentWindow().unminimize()
    getCurrentWindow().setFocus()
  }, [timer])

  const handleToggleTimer = () => {
    if (isActive) {
      pauseTimer()

      return
    }

    startTimer()
  }

  const handleStop = () => {
    clearInterval(intervalId)

    endTime = null
    passedTime = 0;

    setTimerStatus(TimerStatusKey.INACTIVE);
    setPomodoroSatus(PomodoroStatusKey.PMODORO)
    setTimer(POMODORO_TIMER)
  }

  return {
    isPomodoro,
    isBreak,
    isInactive,
    isActive,
    isPause,
    minutes,
    seconds,
    handleToggleTimer,
    handleStop,
  }
}
