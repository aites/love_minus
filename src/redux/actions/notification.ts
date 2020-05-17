import {
  show,
  success,
  error,
  warning,
  info,
  hide,
  removeAll,
} from 'react-notification-system-redux';
import NotificationSystem from 'react-notification-system';

// dispatch(show(notification, level));
// dispatch(success(notification));
// dispatch(error(notification));
// dispatch(warning(notification));
// dispatch(info(notification));
// dispatch(hide(uid)); // Hides notification based on uid
// dispatch(removeAll()); // Removes all notifications

export const infoNotification = (notification: NotificationSystem.Notification) => {
  return (dispatch: Function) => {
    dispatch(info(notification));
  };
};
