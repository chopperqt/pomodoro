export const getDimensions = (
  container: React.MutableRefObject<HTMLElement>
) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = container?.current.offsetWidth;
    dimensions.current.height = container?.current.offsetHeight;
  }, []);

  return dimensions.current;
};
