
import useSound from "use-sound";

import sound from "@/assets/sounds/sound.mp3";

interface UseTimerProps {
  time: number;
}

export const useTimer = ({ time }: UseTimerProps) => {
  const [handlePlaySound] = useSound(sound);

  const formattedTime = time * 60

  const [timer, setTimer] = useState<number>(formattedTime);
  const [start, setStart] = useState<boolean>(false);
  const [isFinished, setFinished] = useState(false);

  const tick = useRef();

  useEffect(() => {
    setTimer(formattedTime)
  }, [time])

  const handleStart = () => {
    setStart(true);
  };

  const handleStop = () => {
    setStart(false);
  };

  const handleToggle = () => {
    setStart(!start);
  };

  const handleReset = () => {
    setTimer(formattedTime)
    setFinished(false)
  }

  /**
   * Отсчитываем 1, кажду секунде, от таймера
   */
  useEffect(() => {
    if (start) {
      //@ts-ignore
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);

      return;
    }


    clearInterval(tick.current);

    return () => clearInterval(tick.current);
  }, [start]);

  /*
   * Если, таймер не закончится мы возвращаеся
   * Если, таймер === 0, тогда проигрывается звук и 
   * выставялется положение, что таймер не запущен
   */
  useEffect(() => {
    if (timer !== 0) {
      return;
    }

    setFinished(true);
    handlePlaySound();

    setStart(false);
  }, [timer]);


  return {
    handleStart,
    handleStop,
    handleToggle,
    handleReset,
    isFinished,
    timer,
    isStarted: start,
    start,
  };
};
