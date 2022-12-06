import { KeysList } from "@/helpers/keysList";

interface UseCounterProps {
  value: number;
  min: number;
  max: number;
  onIncrease?: (nextValue: number) => void;
  onDecrease?: (nextValue: number) => void;
  onSave: (nextValue: number) => void;
  step: number;
}

export const useCounter = ({
  value,
  min = 0,
  max = 10,
  onIncrease = () => {},
  onDecrease = () => {},
  step = 1,
  onSave,
}: UseCounterProps) => {
  const [formattedValue, setFormattedValue] = useState(value || min);
  const counterRef = useRef<HTMLDivElement | null>(null);

  const isDisabledDecrease = min >= formattedValue;
  const isDisabledIncrease = max <= formattedValue;

  const handleIncrease = () => {
    setFormattedValue((value) => {
      if (max <= value) {
        onIncrease(value);

        return value;
      }

      onIncrease(value + step);

      return value + step;
    });
  };

  const handleDecrease = () => {
    setFormattedValue((value) => {
      if (value <= min) {
        onDecrease(value);

        return value;
      }

      onDecrease(value - step);

      return value - step;
    });
  };

  const eventDownController = (e: KeyboardEvent) => {
    if (e.code === "ArrowLeft") {
      handleDecrease();
    }

    if (e.code === "ArrowRight") {
      handleIncrease();
    }

    if (e.code === "Enter") {
      setTimeout(() => {
        onSave(formattedValue);
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", eventDownController);

    return () => {
      window.removeEventListener("keydown", eventDownController);
    };
  }, [formattedValue]);

  return {
    isDisabledDecrease,
    isDisabledIncrease,
    handleDecrease,
    handleIncrease,
    formattedValue,
    counterRef,
  };
};
