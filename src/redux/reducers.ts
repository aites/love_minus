import { combineReducers } from 'redux';
import { connectRouter, ConnectedRouterProps } from 'connected-react-router';
import { reducer as notifications, NotificationsProps } from 'react-notification-system-redux';
import firebaseReducer, { AppStateProps } from './reducers/firebaseReducer';

export type RootStateProps = {
  router: ConnectedRouterProps;
  notifications: NotificationsProps;
  firebase: AppStateProps;
};

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    firebase: firebaseReducer,
  });
export default createRootReducer;
