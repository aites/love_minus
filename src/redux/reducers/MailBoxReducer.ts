import { ChatRoom } from '../../modules/models/Chatroom';

type Actions = {
  type: string;
  chatrooms: ChatRoom[];
};

export type ChatroomStateProps = {
  isLoading: boolean;
  chatrooms: ChatRoom[];
};

export const UPDATE_CHATLIST = 'UPDATE_CHATLIST' as const;

const initialState: ChatroomStateProps = { isLoading: true, chatrooms: [] };

const chatroomReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case UPDATE_CHATLIST:
      return {
        ...state,
        isLoading: false,
        chatrooms: action.chatrooms.concat(),
      };
  }
  return state;
};
export default chatroomReducer;
