import Notifications from 'react-notification-system-redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { success } from 'react-notification-system-redux';
import { RootStateProps } from '../redux/reducers';

type Props = {
  notifications: any;
  notifySuccess: any;
};
class Notification extends Component<Props> {
  render() {
    const { notifications } = this.props;
    const style = {
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px',
        },

        success: {
          // Applied only to the success notification item
          color: 'red',
        },
      },
    };
    return <Notifications notifications={notifications} style={style} />;
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    notifications: state.notifications,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    notifySuccess(title: string) {
      dispatch(success({ title }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
