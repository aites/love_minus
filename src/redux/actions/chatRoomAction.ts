import { leaveChatRoom } from '../../modules/models/Chatroom';

export const leaveRoom = (roomId: string) => {
  return async (dispatch: Function) => {
    await leaveChatRoom(roomId);
  };
};
