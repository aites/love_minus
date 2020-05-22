import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as notifications, NotificationsProps } from 'react-notification-system-redux';
import firebaseReducer, { AppStateProps } from './reducers/firebaseReducer';
import chatroomReducer, { ChatroomStateProps } from './reducers/MailBoxReducer';
import chatMessageReducer, { ChatMessageProps } from './reducers/chatMessageReducer';

export type RootStateProps = {
  router: RouterState;
  notifications: NotificationsProps;
  firebase: AppStateProps;
  chatroom: ChatroomStateProps;
  chatmessage: ChatMessageProps;
};

const createRootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    notifications,
    firebase: firebaseReducer,
    chatroom: chatroomReducer,
    chatmessage: chatMessageReducer,
  });
export default createRootReducer;
