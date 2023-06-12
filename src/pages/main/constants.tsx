export const TimerKey = {
  pomodoro: "pomodoro",
  timeout: "timeout",
  repeats: "repeats",
};

export const Timers = {
  [TimerKey.pomodoro]: {
    label: "Pomodoro",
    min: 25,
    max: 60,
    value: 30,
  },
  [TimerKey.timeout]: {
    label: "Timeout",
    min: 5,
    max: 60,
    value: 10,
  },
  [TimerKey.repeats]: {
    label: "Amount of repeats",
    min: 3,
    max: 10,
    value: 5,
  },
};

export const AnimationKey = {
  timer: "timer",
  timeout: "timeout",
  actions: "actions",
};

export const Animations = {
  [AnimationKey.timeout]: {
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      delay: 0.4,
    },
  },
  [AnimationKey.timer]: {
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      delay: 0.2,
    },
  },
  [AnimationKey.actions]: {
    opacity: [0, 1],
    y: [20, 0],
    transition: {
      delay: 0.6,
    },
  },
};
