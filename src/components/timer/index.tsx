interface Props {
  timer: number
}

export const Timer = ({ timer }: Props) => {
  const formattedTime = timer < 10 ? `0${timer}` : timer

  return (
    <div className="p-6 bg-gray-300 rounded-lg text-center">
      <div className="p-6 bg-gray-400 rounded-md min-w-[60px] min-h-[60px] flex items-center justify-center">
        <span className="text-4xl font-bold text-white">
          {formattedTime}
        </span>
      </div>
    </div>
  )
}
