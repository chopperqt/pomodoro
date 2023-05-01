import { useDispatch, useSelector } from "react-redux";

import {
  getMenuOpen,
  onSetMenuOpen,
  onSetSettingsDisable,
} from "@/service/settings";
import { createNotification } from "@/helpers/createNotification";

const END_POMODORO_TEXT = "30 seconds until the end of the pomodoro.";
const END_TIMEOUT_TEXT = "30 seconds until the end of the timeout.";

const NOTIFICATION_TIME = 30

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

  const [amountOfCompletedPoints, setAmountOfCompletedPoints] = useState(0);

  const isMenuOpen = useSelector(getMenuOpen);

  const isFinishedSessia = useMemo(() => {
    return isFinishedTimeout && isFinishedPomodoro
  }, [isFinishedPomodoro, isFinishedTimeout])

  const handleToggle = () => {
    if (!isFinishedPomodoro) {
      handleTogglePomodoro()

      return
    }

    handleToggleTimeout()
  }

  const handleHotKeyController = (e: KeyboardEvent) => {
    if (e.code !== "Space") {
      return;
    }
  };

  const handleResetTimers = () => {
    handleResetPomodoro()
    handleResetTimeout()
  }

  const handleReset = () => {
    setAmountOfCompletedPoints(0)
    handleResetTimers()
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

  useEffect(() => {
    if (timerPomodoro !== NOTIFICATION_TIME) {
      return
    }

    createNotification({
      text: END_POMODORO_TEXT,
    })
  }, [timerPomodoro]);

  useEffect(() => {
    if (timerTimeout !== NOTIFICATION_TIME) {
      return
    }

    createNotification({
      text: END_TIMEOUT_TEXT,
    })
  }, [timerTimeout])

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
