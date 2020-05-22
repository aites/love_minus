import { postChatMessage } from '../../modules/models/Chatroom';

const sendStart = (message: string) => ({
  type: 'SEND_START',
  message: message,
});
const sendEnd = (message: string) => ({
  type: 'SEND_END',
  message: message,
});
export const sendMessage = (chatroomId: string, message: string) => {
  return async (dispatch: Function) => {
    dispatch(sendStart(message));
    await postChatMessage({
      chatroomId: chatroomId,
      message: message,
    });
    dispatch(sendEnd(message));
  };
};
