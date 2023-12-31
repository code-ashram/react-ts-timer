import { FC, useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'

import TimeUnitChanger from './parts/TimeUnitChanger.tsx'
import Time from '../../models/Time.ts'

import styles from './Timer.module.css'
import TimerButton from './parts/TimerButton.tsx'

const Timer: FC = () => {
  const [time, setTime] = useState<Time>({ seconds: 0, minutes: 0, hours: 0 })
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleToggleStart = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime((prevTime) => ({ ...prevTime, seconds: 0, minutes: 0, hours: 0 }))
  }

  const handleIncreaseSeconds = () => {
    setTime((prevTime) => {
      if (prevTime.seconds >= 59) {
        setTime({ ...prevTime, seconds: 0 })
      } else if (prevTime.seconds < 0) {
        setTime({ ...prevTime, seconds: 59 })
      }

      return { ...prevTime, seconds: prevTime.seconds + 1 }
    })
  }

  const handleDecreaseSeconds = () => {
    setTime((prevTime) => {
      if (prevTime.seconds <= 0) {
        setTime({ ...prevTime, seconds: 59 })
      } else if (prevTime.seconds > 59) {
        setTime({ ...prevTime, seconds: 0 })
      }

      return { ...prevTime, seconds: prevTime.seconds - 1 }
    })
  }

  const handleIncreaseMinutes = () => {
    setTime((prevTime) => {
      if (prevTime.minutes >= 59) {
        setTime({ ...prevTime, minutes: 0 })
      } else if (prevTime.minutes < 0) {
        setTime({ ...prevTime, minutes: 59 })
      }

      return { ...prevTime, minutes: prevTime.minutes + 1 }
    })
  }
  const handleDecreaseMinutes = () => {
    setTime((prevTime) => {
      if (prevTime.minutes <= 0) {
        setTime({ ...prevTime, minutes: 59 })
      } else if (prevTime.minutes > 59) {
        setTime({ ...prevTime, minutes: 0 })
      }

      return { ...prevTime, minutes: prevTime.minutes - 1 }
    })
  }

  const handleIncreaseHours = () => {
    setTime((prevTime) => {
      if (prevTime.hours >= 23) {
        setTime({ ...prevTime, hours: 0 })
      } else if (prevTime.hours < 0) {
        setTime({ ...prevTime, hours: 23 })
      }

      return { ...prevTime, hours: prevTime.hours + 1 }
    })
  }

  const handleDecreaseHours = () => {
    setTime((prevTime) => {
      if (prevTime.hours <= 0) {
        setTime({ ...prevTime, hours: 23 })
      } else if (prevTime.hours > 23) {
        setTime({ ...prevTime, hours: 0 })
      }

      return { ...prevTime, hours: prevTime.hours - 1 }
    })
  }

  useEffect(() => {
      let intervalId: number | undefined

      if (isActive) {
        intervalId = setInterval(() => {
          if (time.seconds > 0) {
            setTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds - 1 }))
          } else if (time.minutes > 0) {
            setTime((prevTime) => ({ ...prevTime, seconds: 59, minutes: prevTime.minutes - 1 }))
          } else if (time.hours > 0) {
            setTime((prevTime) => ({ ...prevTime, seconds: 59, minutes: 59, hours: prevTime.hours - 1 }))
          }

          if (time.seconds === 0 && time.minutes === 0 && time.hours === 0) {
            setIsActive(false)
            alert('Time is over!')
          }
        }, 1000)
      }

      return () => clearInterval(intervalId)
    }, [isActive, time]
  )

  return <div className={styles.timer}>
    <div className={styles.timerDisplay}>
      <TimeUnitChanger onIncrease={handleIncreaseHours} onDecrease={handleDecreaseHours} time={time.hours} />

      <TimeUnitChanger onIncrease={handleIncreaseMinutes} onDecrease={handleDecreaseMinutes} time={time.minutes} />

      <TimeUnitChanger onIncrease={handleIncreaseSeconds} onDecrease={handleDecreaseSeconds} time={time.seconds} />
    </div>

    <div className={styles.controlPanel}>
      <TimerButton onClick={handleToggleStart}>
        <FontAwesomeIcon icon={isActive ? faPause : faPlay} size="xl" style={{ color: '#4aac26' }} />
      </TimerButton>

      <TimerButton onClick={handleToggleStart}>
        <FontAwesomeIcon icon={faArrowRotateRight} size="xl" style={{ color: '#4aac26' }} />
      </TimerButton>
    </div>
  </div>
}

export default Timer
