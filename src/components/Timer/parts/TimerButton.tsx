import { FC, ReactNode } from 'react'
import styles from '../Timer.module.css'

type Props = {
  children: ReactNode
  onClick: () => void
}

const TimerButton: FC<Props> = ({children, onClick}) => (
  <button className={styles.btn}
          onClick={onClick}>
    {children}
  </button>
)

export default TimerButton
