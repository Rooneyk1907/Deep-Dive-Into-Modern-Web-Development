import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = ({ notificationType }) => {
  const notification = useSelector(state => state.notifications)

  const notificationSuccess = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const notificationError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <>
      {notification && (
        <div
          style={
            notificationType === 'error'
              ? notificationError
              : notificationSuccess
          }>
          {notification}
        </div>
      )}
    </>
  )
}

// Notification.propTypes = {
//   message: PropTypes.string.isRequired,
//   notificationType: PropTypes.string.isRequired,
// }

export default Notification
