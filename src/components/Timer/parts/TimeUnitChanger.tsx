import { FC } from 'react'

import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import styles from '../Timer.module.css'

type Props = {
  onIncreaseHours: () => void,
  onIncreaseMinutes: () => void,
  onIncreaseSeconds: () => void,
  onDecreaseHours: () => void,
  onDecreaseMinutes: () => void,
  onDecreaseSeconds: () => void,
  time: string
}

const TimeUnitChanger: FC<Props> = ({
  onIncreaseHours,
  onIncreaseMinutes,
  onIncreaseSeconds,
  onDecreaseHours,
  onDecreaseMinutes,
  onDecreaseSeconds,
  time
}) => {

  return (
    <div className={styles.timeChanger}>
      <div className={styles.timerChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onIncreaseHours}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onIncreaseMinutes}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onIncreaseSeconds}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>
      </div>

      <div className={styles.timerDisplay}>{time}</div>

      <div className={styles.timerChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onDecreaseHours}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onDecreaseMinutes}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={onDecreaseSeconds}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>
      </div>


    </div>
  )
}

export default TimeUnitChanger
