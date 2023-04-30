export const TimerKey = {
  pomodoro: "pomodoro",
  timeout: "timeout",
  repeats: "repeats"
}

export const Timers = {
  [TimerKey.pomodoro]: {
    label: 'Pomodoro',
    min: 25,
    max: 60,
    value: 25,
  },
  [TimerKey.timeout]: {
    label: 'Timeout',
    min: 5,
    max: 60,
    value: 5,
  },
  [TimerKey.repeats]: {
    label: 'Amout of repeats',
    min: 3,
    max: 10,
    value: 5,
  }
}
