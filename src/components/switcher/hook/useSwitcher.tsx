import { KeysList } from "@/helpers/keysList";

export const useSwitcher = () => {
  const [isEnabled, setEnabled] = useState(false);

  const enableRef = useRef<HTMLButtonElement | null>(null);
  const disableRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    disableRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key !== KeysList.ArrowLeft) {
        return;
      }

      setEnabled(true);
    });

    enableRef.current?.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === KeysList.ArrowRight) {
        setEnabled(false);
      }

      if (e.key === KeysList.ArrowLeft) {
        setEnabled(true);
      }
    });
  }, [isEnabled]);

  return {
    enableRef,
    disableRef,
    isEnabled,
  };
};
