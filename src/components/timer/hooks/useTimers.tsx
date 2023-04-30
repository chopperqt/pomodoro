import { invoke } from "@tauri-apps/api";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

import {
  getAutoStart,
  getMenuOpen,
  onSetMenuOpen,
  onSetSettingsDisable,
} from "@/service/settings";
import { StatusList } from "@/helpers/statusList";
import { createNotification } from "@/helpers/createNotification";
import sound from "@/assets/sounds/sound.mp3";

const END_POMODORO_TEXT = "30 seconds until the end of the pomodoro.";
const END_TIMEOUT_TEXT = "30 seconds until the end of the timeout.";

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
  const isAutoStart = useSelector(getAutoStart);

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

  const handleReset = () => {
    setStart(false);
    setAmountOfCompletedPoints(0);
    //firstStart.current = true;
    isTimeout.current = false;

    setTimer(time * 60);
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

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;

      return;
    }

    if (start) {
      dispatch(onSetMenuOpen(false));
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
    if (timer === 30) {
      const text = isTimeout.current ? END_TIMEOUT_TEXT : END_POMODORO_TEXT

      createNotification({
        text,
      })
    }

    if (timer !== 0) {
      return;
    }

    handlePlaySound();

    if (!isTimeout.current) {
      isTimeout.current = true;

      setTimer(timeout * 60);
      setStart(false);

      if (isAutoStart) {
        handleStartTimer();
      }

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

    if (isAutoStart) {
      handleStartTimer();
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
    isStarted: start,
    handleToggleTimer,
    amountOfCompletedPoints,
    isTimeout,
    handleReset,
    start,
  };
};
