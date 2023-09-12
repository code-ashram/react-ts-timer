import { FC, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowRotateRight, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import { hour, minute } from '../../Constants/time.ts'

import styles from './Timer.module.css'

const Timer: FC = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleToggleStart = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setSeconds(0)
  }

  useEffect(() => {
      let intervalId: number | undefined;

      if (isActive) {
        intervalId = setInterval(() => setSeconds(seconds + 1), 1000)
      }

      return () => clearInterval(intervalId)
    }, [isActive, seconds]
  )

  const hours = Math.floor(seconds / hour)

  const minutes = Math.floor((seconds % hour) / minute)

  return <div className={styles.timer}>
    <div className={styles.timerDisplay}>
      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{color: "#4aac26",}} />
        </button>

        <div>{hours.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{color: "#4aac26",}} />
        </button>
      </div>

      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{color: "#4aac26",}} />
        </button>

        <div>{minutes.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{color: "#4aac26",}} />
        </button>
      </div>

      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{color: "#4aac26",}} />
        </button>

        <div>{seconds.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{color: "#4aac26",}} />
        </button>
      </div>
    </div>

    <div className={styles.controlPanel}>
      <button className={styles.btn} onClick={handleToggleStart}>
        <FontAwesomeIcon icon={isActive ? faPause : faPlay} size="xl" style={{ color: '#4aac26' }} />
      </button>

      <button className={styles.btn} onClick={handleReset}>
        <FontAwesomeIcon icon={faArrowRotateRight} size="xl" style={{ color: '#4aac26' }} />
      </button>
    </div>
  </div>
}

export default Timer
