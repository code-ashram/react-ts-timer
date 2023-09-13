import { FC } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../Timer.module.css'


type Props = {
  icon: IconProp
  onClick: () => void
}

const TimerButton: FC<Props> = ({icon, onClick}) => (
  <button className={styles.btn} onClick={onClick}>
    <FontAwesomeIcon icon={icon} size="xl" style={{ color: '#4aac26' }} />
  </button>
)

export default TimerButton
