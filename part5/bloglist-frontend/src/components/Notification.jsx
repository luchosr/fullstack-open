import './Notification.styles.css';

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification ${messageType}`}>{message}</div>;
};

export default Notification;
