import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })

  if (!notification) return null
  return <Alert variant={`${notification.type}`}>{notification.message}</Alert>
}

export default Notification
