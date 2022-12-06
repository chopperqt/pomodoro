import { Cycle, motion, useCycle } from "framer-motion";
import { MenuToggle } from "./components/MenuToggle";

import { getDimensions } from "./hooks/useDimension";

import styles from "./styles.module.scss";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 90,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface SideBarProps {
  isOpened: boolean;
  onToggle: Cycle;
  children: React.ReactElement | React.ReactElement[];
}
const SideBar = ({ children, isOpened, onToggle }: SideBarProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setHeight(containerRef.current.clientHeight);
  }, [containerRef]);

  console.log(height);

  return (
    <>
      <motion.nav
        ref={containerRef}
        initial={false}
        animate={isOpened ? "open" : "closed"}
        custom={height}
        className={styles.content}
      >
        <motion.div className={styles.background} variants={sidebar} />
        <motion.div variants={variants} className={styles.wrap}>
          {children}
        </motion.div>
        <MenuToggle toggle={() => onToggle()} />
      </motion.nav>
    </>
  );
};

export default SideBar;
