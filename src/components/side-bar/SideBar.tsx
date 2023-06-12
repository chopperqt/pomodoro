import { Cycle, motion } from "framer-motion";
import cx from "classnames";

import { MenuToggle } from "./components/MenuToggle";

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
    clipPath: "circle(25px at 40px 40px)",
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

const AnimeteKey = {
  open: "open",
  closed: "closed",
};

interface SideBarProps {
  isOpened: boolean;
  onToggle: Cycle;
  children: React.ReactElement | React.ReactElement[];
  isDisabled?: boolean;
}

const SideBar = ({
  children,
  isOpened,
  onToggle,
  isDisabled,
}: SideBarProps) => {
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

  const animate = isOpened ? AnimeteKey.open : AnimeteKey.closed;

  return (
    <>
      <motion.nav
        ref={containerRef}
        initial={false}
        animate={animate}
        custom={height}
        className={cx(styles.content, {
          [styles.contentDisabled]: isDisabled,
        })}
      >
        <motion.div className={styles.background} variants={sidebar} />
        <motion.div variants={variants} className={styles.wrap}>
          {children}
        </motion.div>
        <MenuToggle toggle={handleToggle} />
      </motion.nav>
    </>
  );
};

export default SideBar;
