import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notificationMessage = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notificationMessage) return null

  return <div style={style}>{notificationMessage}</div>
}

export default Notification
