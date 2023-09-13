import { FC, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import TimeUnitChanger from './parts/TimeUnitChanger.tsx'
import TimerButton from './parts/TimerButton.tsx'

import styles from './Timer.module.css'
import { hour, minute, second } from '../../constants/time.ts'

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

  const time = `${
    String(date.getUTCHours()).padStart(2, '0')
  }:${
    String(date.getUTCMinutes()).padStart(2, '0')
  }:${
    String(date.getUTCSeconds()).padStart(2, '0')
  }`

  const handleIncreaseHours = () => {
    setSeconds((prevHours )=> prevHours + hour)
  }

  const handleDecreaseHours = () => {
    setSeconds((prevHours )=> prevHours - hour)
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

  return <div className={styles.timer}>
    <div className={styles.timerChanger}>
      <TimeUnitChanger onIncreaseHours={handleIncreaseHours}
                       onIncreaseMinutes={handleIncreaseMinutes}
                       onIncreaseSeconds={handleIncreaseSeconds}
                       onDecreaseHours={handleDecreaseHours}
                       onDecreaseMinutes={handleDecreaseMinutes}
                       onDecreaseSeconds={handleDecreaseSeconds}
                       time={time} />
    </div>

    <div className={styles.timerController}>
      <TimerButton onClick={handleToggleStart}>
        <FontAwesomeIcon icon={isActive ? faPause : faPlay} size="xl" style={{ color: '#4aac26' }} />
      </TimerButton>

      <TimerButton onClick={handleReset}>
        <FontAwesomeIcon icon={faArrowRotateRight} size="xl" style={{ color: '#4aac26' }} />
      </TimerButton>
    </div>
  </div>
}

export default Timer
