import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification] = useContext(NotificationContext)

  if (!notification) return null
  return <div className={`notification`}>{notification}</div>
}

export default Notification
