export const getFormateTime = (time: number) => {

  const mins = Math.floor(time / 60);
  const seconds_ = time % 60;

  let formattedSeconds = seconds_ < 10 ? `0${seconds_}` : seconds_;

  if (seconds_ === 0) {
    formattedSeconds = "00";
  }

  const formattedMinutes = mins < 10 ? `0${mins}` : mins;

  return formattedMinutes + ":" + formattedSeconds;
};
