import { FC, useEffect, useState } from 'react'

import { faPause, faPlay, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import TimeUnitChanger from './parts/TimeUnitChanger.tsx'
import TimerButton from './parts/TimerButton.tsx'
import { hour, minute, second } from '../../constants/time.ts'

import styles from './Timer.module.css'

const Timer: FC = () => {
  const [seconds, setSeconds] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleToggleStart = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setSeconds(0)
  }

  const date: Date = new Date(seconds * 1000)

  const handleIncreaseHours = () => {
    setSeconds((prevHours) => prevHours + hour)
  }

  const handleDecreaseHours = () => {
    setSeconds((prevHours) => prevHours - hour)
  }

  const handleIncreaseMinutes = () => {
    setSeconds((prevMinutes) => prevMinutes + minute)
  }

  const handleDecreaseMinutes = () => {
    setSeconds((prevMinutes) => prevMinutes - minute)
  }

  const handleIncreaseSeconds = () => {
    setSeconds((prevSeconds) => prevSeconds + second)
  }

  const handleDecreaseSeconds = () => {
    setSeconds((prevSeconds) => prevSeconds - second)
  }

  useEffect(() => {
      let intervalId: number | undefined

      if (isActive) {
        intervalId = setInterval(() => {
          setSeconds(seconds - 1)

          if (seconds === 1) {
            setIsActive(false)
            alert('Time is over!')
          }
        }, 1000)
      }

      return () => clearInterval(intervalId)
    }, [isActive, seconds]
  )

  return (
    <div className={styles.timer}>
      <div className={styles.timerDisplay}>
        <TimeUnitChanger
          onIncrease={handleIncreaseHours}
          onDecrease={handleDecreaseHours}
          time={String(date.getUTCHours()).padStart(2, '0')}
        />

        <TimeUnitChanger
          onIncrease={handleIncreaseMinutes}
          onDecrease={handleDecreaseMinutes}
          time={String(date.getUTCMinutes()).padStart(2, '0')}
        />

        <TimeUnitChanger
          onIncrease={handleIncreaseSeconds}
          onDecrease={handleDecreaseSeconds}
          time={String(date.getUTCSeconds()).padStart(2, '0')}
        />
      </div>

      <div className={styles.timerController}>
        <TimerButton icon={isActive ? faPause : faPlay} onClick={handleToggleStart} />

        <TimerButton icon={faArrowRotateRight} onClick={handleReset} />
      </div>
    </div>
  )
}

export default Timer
