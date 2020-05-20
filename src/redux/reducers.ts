import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as notifications, NotificationsProps } from 'react-notification-system-redux';
import firebaseReducer, { AppStateProps } from './reducers/firebaseReducer';
import chatroomReducer, { ChatroomStateProps } from './reducers/chatroomReducer';

export type RootStateProps = {
  router: RouterState;
  notifications: NotificationsProps;
  firebase: AppStateProps;
  chatroom: ChatroomStateProps;
};

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    firebase: firebaseReducer,
    chatroom: chatroomReducer,
  });
export default createRootReducer;
