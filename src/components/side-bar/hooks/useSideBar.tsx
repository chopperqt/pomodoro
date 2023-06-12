import { Cycle } from "framer-motion";

interface UseSideBarProps {
  isDisabled?: boolean;
  onToggle: Cycle;
}

export const useSideBar = ({
  isDisabled = false,
  onToggle,
}: UseSideBarProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

  const handleToggle = () => {
    if (isDisabled) {
      return;
    }

    onToggle();
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);
  return {
    handleToggle,
    height,
    containerRef,
  };
};
