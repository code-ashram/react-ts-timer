import { FC } from 'react'

import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import styles from '../Timer.module.css'

type Props = {
  onIncrease: () => void,
  onDecrease: () => void,
  time: number
}

const TimeUnitChanger: FC<Props> = ({onIncrease, onDecrease, time}) => {

  return (
    <div className={styles.timeChanger}>
      <button className={cn(styles.btn, styles.controlBtn)}
              onClick={onIncrease}>
        <FontAwesomeIcon icon={faCaretUp} size="lg" style={{ color: '#4aac26' }} />
      </button>

      <div>{time.toString().padStart(2, '0')}</div>

      <button className={cn(styles.btn, styles.controlBtn)}
              onClick={onDecrease}>
        <FontAwesomeIcon icon={faCaretDown} size="lg" style={{ color: '#4aac26' }} />
      </button>
    </div>
  )
}

export default TimeUnitChanger
