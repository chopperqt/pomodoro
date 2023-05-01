import { invoke } from "@tauri-apps/api";
import { useDispatch, useSelector } from "react-redux";

import {
  getAutoStart,
  getMenuOpen,
  onSetMenuOpen,
  onSetSettingsDisable,
} from "@/service/settings";
import { StatusList } from "@/helpers/statusList";
import { createNotification } from "@/helpers/createNotification";

const END_POMODORO_TEXT = "30 seconds until the end of the pomodoro.";
const END_TIMEOUT_TEXT = "30 seconds until the end of the timeout.";

interface UseTimerProps {
  timerPomodoro: number;
  timerTimeout: number;
  amountOfRepeats: number;
  isPomodoro: boolean;
  isTimeout: boolean;
  isFinishedPomodoro: boolean
  isFinishedTimeout: boolean
  handleTogglePomodoro: () => void
  handleToggleTimeout: () => void
  handleResetPomodoro: () => void
  handleResetTimeout: () => void
}

export const useTimers = ({
  timerPomodoro,
  timerTimeout,
  amountOfRepeats,
  isPomodoro,
  isTimeout,
  isFinishedTimeout,
  isFinishedPomodoro,
  handleToggleTimeout,
  handleTogglePomodoro,
  handleResetPomodoro,
  handleResetTimeout,
}: UseTimerProps) => {
  const dispatch = useDispatch();
  const [amountOfCompletedPoints, setAmountOfCompletedPoints] =
    useState<number>(0);
  const isMenuOpen = useSelector(getMenuOpen);

  const isFinishedSessia = useMemo(() => {
    return isFinishedTimeout && isFinishedPomodoro
  }, [isFinishedPomodoro, isFinishedTimeout])

  const isActiveTimeout = isFinishedPomodoro

  const handleToggle = () => {
    if (!isFinishedPomodoro) {
      handleTogglePomodoro()

      return
    }

    console.log('tut')
    handleToggleTimeout()
  }

  const handleReset = () => {
    setAmountOfCompletedPoints(0);
  };

  const handleHotKeyController = (e: KeyboardEvent) => {
    if (e.code !== "Space") {
      return;
    }
  };

  const handleResetTimers = () => {
    handleResetTimeout()
    handleResetPomodoro()
  }

  useEffect(() => {
    if (!isFinishedSessia) {
      return
    }

    if (amountOfCompletedPoints < amountOfRepeats) {
      setAmountOfCompletedPoints((prev) => prev + 1)
    }

    handleResetTimers()
  }, [isFinishedSessia])

  useEffect(() => {
    if (isPomodoro || isTimeout) {
      dispatch(onSetMenuOpen(false));
      dispatch(onSetSettingsDisable(true));
      //      const name = isTimeout.current ? StatusList.timeout : StatusList.start;
      //     invoke("set_icon", { name });
      return;
    }

    // invoke("set_icon", { name: StatusList.pause });

    dispatch(onSetSettingsDisable(false));
  }, [isPomodoro, isTimeout]);


  // useEffect(() => {
  //   if (timer === 30) {
  //     const text = isTimeout.current ? END_TIMEOUT_TEXT : END_POMODORO_TEXT
  //
  //     createNotification({
  //       text,
  //     })
  //   }
  //
  //   if (timer !== 0) {
  //     return;
  //   }
  //
  //
  //   if (amountOfCompletedPoints + 1 >= amountOfRepeats) {
  //     setAmountOfCompletedPoints((amount) => amount + 1);
  //
  //     return;
  //   }
  //
  //   setAmountOfCompletedPoints((amount) => amount + 1);
  // }, [timer]);

  useEffect(() => {
    if (isMenuOpen) {
      return;
    }

    window.addEventListener("keydown", handleHotKeyController);

    return () => {
      window.removeEventListener("keydown", handleHotKeyController);
    };
  }, [isTimeout, isPomodoro, isMenuOpen]);

  return {
    amountOfCompletedPoints,
    handleToggle,
    handleReset,
  };
};
