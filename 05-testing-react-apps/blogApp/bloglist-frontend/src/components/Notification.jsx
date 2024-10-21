import PropTypes from 'prop-types'

const Notification = ({ message, notificationType }) => {
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

  // console.log(notificationType, notificationSuccess, notificationError)

  if (message === null) {
    return null
  } else {
    return (
      <div
        style={
          notificationType === 'error' ? notificationError : notificationSuccess
        }>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  notificationType: PropTypes.string.isRequired,
}

export default Notification
