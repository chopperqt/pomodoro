import { getFormateTime } from '../helpers/getFormateTime'

import styles from '../Timer.module.scss'

interface TimePreviewProps {
  time: number
}

export const TimerPreviev = memo(({
  time
}: TimePreviewProps) => {
  const formattedTime = getFormateTime(time)

  return (
    < div className={styles.timer} >{formattedTime}</div >
  )
})
