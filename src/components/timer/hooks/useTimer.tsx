import { invoke } from "@tauri-apps/api";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

import { getMenuOpen, onSetSettingsDisable } from "@/service/settings";
import { StatusList } from "@/helpers/statusList";

import sound from "@/assets/sounds/sound.mp3";

interface UseTimerProps {
  time: number;
  timeout: number;
  amountOfRepeats: number;
}
export const useTimer = ({ time, timeout, amountOfRepeats }: UseTimerProps) => {
  const dispatch = useDispatch();
  const [handlePlaySound] = useSound(sound);
  const [timer, setTimer] = useState<number>(time * 60);
  const [start, setStart] = useState<boolean>(false);
  const [amountOfCompletedPoints, setAmountOfCompletedPoints] =
    useState<number>(0);
  const isMenuOpen = useSelector(getMenuOpen);

  const firstStart = useRef(true);
  const tick = useRef();
  const isTimeout = useRef(false);

  const handleStartTimer = () => {
    setStart(true);
  };

  const handleStopTimer = () => {
    setStart(false);
  };

  const handleToggleTimer = () => {
    setStart(!start);
  };

  const handleHotKeyController = (e: KeyboardEvent) => {
    if (e.code !== "Space") {
      return;
    }

    if (start) {
      handleStopTimer();

      return;
    }

    handleStartTimer();
  };

  const dispSecondsAsMins = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;

    let formattedSeconds = seconds_ < 10 ? `0${seconds_}` : seconds_;

    if (seconds_ === 0) {
      formattedSeconds = "00";
    }

    const formattedMinutes = mins < 10 ? `0${mins}` : mins;

    return formattedMinutes + ":" + formattedSeconds;
  };

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;

      return;
    }

    if (start) {
      dispatch(onSetSettingsDisable(true));

      const name = isTimeout.current ? StatusList.timeout : StatusList.start;

      invoke("set_icon", { name });

      //@ts-ignore
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      return;
    }

    invoke("set_icon", { name: StatusList.pause });

    dispatch(onSetSettingsDisable(false));
    clearInterval(tick.current);

    return () => clearInterval(tick.current);
  }, [start]);

  useEffect(() => {
    setTimer(time * 60);
  }, [time]);

  useEffect(() => {
    if (timer === 0) {
      handlePlaySound();

      if (!isTimeout.current) {
        isTimeout.current = true;

        setTimer(timeout * 60);
        setStart(false);

        return;
      }

      if (amountOfCompletedPoints + 1 >= amountOfRepeats) {
        setAmountOfCompletedPoints((amount) => amount + 1);

        return;
      }

      setAmountOfCompletedPoints((amount) => amount + 1);

      isTimeout.current = false;

      setTimer(time * 60);
      setStart(false);
    }
  }, [timer]);

  useEffect(() => {
    if (amountOfCompletedPoints !== amountOfRepeats) {
      return;
    }

    setStart(false);
    setTimer(time * 60);
    setAmountOfCompletedPoints(0);

    isTimeout.current = false;
  }, [amountOfCompletedPoints]);

  useEffect(() => {
    if (isMenuOpen) {
      return;
    }

    window.addEventListener("keydown", handleHotKeyController);

    return () => {
      window.removeEventListener("keydown", handleHotKeyController);
    };
  }, [start, isMenuOpen]);

  return {
    timer,
    handleStartTimer,
    handleStopTimer,
    dispSecondsAsMins,
    isStarted: start,
    handleToggleTimer,
    amountOfCompletedPoints,
    isTimeout,
  };
};
