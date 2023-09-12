import { FC, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowRotateRight, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

import styles from './Timer.module.css'

const Timer: FC = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleToggleStart = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  const handleIncreaseSeconds = () => {
    setSeconds((prevSecond) => {
      if (prevSecond >= 59) {
        setSeconds(0)
      } else if (prevSecond < 0) {
        setSeconds(59)
      }

      return prevSecond + 1
    })
  }

  const handleDecreaseSeconds = () => {
    setSeconds((prevSecond) => {
      if (prevSecond <= 0) {
        setSeconds(59)
      } else if (prevSecond > 59) {
        setSeconds(0)
      }

      return prevSecond - 1
    })
  }

  const handleIncreaseMinutes = () => {
    setMinutes((prevMinute) => {
      if (prevMinute >= 59) {
        setMinutes(0)
      } else if (prevMinute < 0) {
        setMinutes(59)
      }

      return prevMinute + 1
    })
  }

  const handleDecreaseMinutes = () => {
    setMinutes((prevMinute) => {
      if (prevMinute <= 0) {
        setMinutes(59)
      } else if (prevMinute > 59) {
        setMinutes(0)
      }

      return prevMinute - 1
    })
  }

  const handleIncreaseHours = () => {
    setHours((prevHours) => {
      if (prevHours >= 23) {
        setHours(0)
      } else if (prevHours < 0) {
        setHours(23)
      }

      return prevHours + 1
    })
  }

  const handleDecreaseHours = () => {
    setHours((prevHours) => {
      if (prevHours <= 0) {
        setHours(23)
      } else if (prevHours > 23) {
        setHours(0)
      }

      return prevHours - 1
    })
  }

  useEffect(() => {
      let intervalId: number | undefined

      if (isActive) {
        intervalId = setInterval(() => {
          if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1)
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1)
            setSeconds(59)
          } else if (hours > 0) {
            setHours((prevHours) => prevHours - 1)
            setMinutes(59)
            setSeconds(59)
          }

          if (seconds === 0 && minutes === 0 && hours === 0) {
            setIsActive(false)
            alert('Time is over!')
          }
        }, 1000)
      }



      return () => clearInterval(intervalId)
    }, [isActive, seconds, minutes, hours]
  )

  return <div className={styles.timer}>
    <div className={styles.timerDisplay}>
      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleIncreaseHours}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <div>{hours.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleDecreaseHours}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>
      </div>

      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleIncreaseMinutes}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <div>{minutes.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleDecreaseMinutes}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>
      </div>

      <div className={styles.timeChanger}>
        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleIncreaseSeconds}>
          <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
        </button>

        <div>{seconds.toString().padStart(2, '0')}</div>

        <button className={cn(styles.btn, styles.controlBtn)}
                onClick={handleDecreaseSeconds}>
          <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
        </button>
      </div>
    </div>

    <div className={styles.controlPanel}>
      <button className={styles.btn}
              onClick={handleToggleStart}>
        <FontAwesomeIcon icon={isActive ? faPause : faPlay} size="xl" style={{ color: '#4aac26' }} />
      </button>

      <button className={styles.btn} onClick={handleReset}>
        <FontAwesomeIcon icon={faArrowRotateRight} size="xl" style={{ color: '#4aac26' }} />
      </button>
    </div>
  </div>
}

export default Timer
