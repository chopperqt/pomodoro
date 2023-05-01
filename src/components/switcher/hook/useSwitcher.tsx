import { KeysList } from "@/helpers/keysList";
import { SwitcherProps } from "../Switcher";

export const useSwitcher = ({ isEnable, onToggle }: SwitcherProps) => {
  const [isEnabled, setEnabled] = useState(isEnable);

  const enableRef = useRef<HTMLButtonElement | null>(null);
  const disableRef = useRef<HTMLButtonElement | null>(null);

  const handleSetEnabled = () => {
    setEnabled(true);
    onToggle(true);
  };

  const handleSetDisabled = () => {
    setEnabled(false);
    onToggle(false);
  };

  useEffect(() => {
    disableRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === KeysList.ArrowLeft) {
        setEnabled(true);
        onToggle(true);
      }

      if (e.key === KeysList.ArrowRight) {
        setEnabled(false);
        onToggle(false);
      }
    });

    enableRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === KeysList.ArrowRight) {
        setEnabled(false);
        onToggle(false);
      }

      if (e.key === KeysList.ArrowLeft) {
        setEnabled(true);
        onToggle(true);
      }
    });
  }, [isEnable]);

  return {
    enableRef,
    disableRef,
    isEnabled,
    handleSetDisabled,
    handleSetEnabled,
  };
};
