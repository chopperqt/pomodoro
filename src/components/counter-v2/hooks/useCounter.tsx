interface UseCounter {
  value: number,
  onChange: (value: number) => void
  min: number
  max: number
}

export const useCounter = ({
  value,
  onChange,
  min,
  max,
}: UseCounter) => {
  const [currentValue, setCurrentValue] = useState(value)

  const handleIncrase = () => {
    if (currentValue >= max) {
      return
    }
    setCurrentValue((prevValue) => prevValue + 1);
  }

  const handleDecrease = () => {
    if (currentValue <= min) {
      return
    }

    setCurrentValue((prevValue) => prevValue - 1)
  }

  useEffect(() => {
    onChange(value)
  }, [value])

  return {
    currentValue,
    handleIncrase,
    handleDecrease,
  }
}
