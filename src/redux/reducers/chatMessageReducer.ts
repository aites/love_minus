import { ChatMessage, ChatRoom } from '../../modules/models/Chatroom';

export const SEND_MESSAGE = 'SEND_MESSAGE' as const;
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE' as const;
export const SELECT_ROOM = 'SELECT_ROOM' as const;

type Actions = ReturnType<typeof selectRoom> | ReturnType<typeof updateMessage>;

export const selectRoom = (roomId: string) => ({
  type: SELECT_ROOM,
  payload: { roomId: roomId },
});
export const updateMessage = (messages: ChatMessage[], chatRoomInfo: ChatRoom) => ({
  type: UPDATE_MESSAGE,
  payload: { messages, chatRoomInfo },
});

export type ChatMessageProps = {
  roomId: string;
  isLoading: boolean;
  messages: ChatMessage[];
  chatRoomInfo?: ChatRoom;
};

const initialState: ChatMessageProps = {
  isLoading: true,
  roomId: '',
  messages: [],
};

const chatroomReducer = (state: ChatMessageProps = initialState, action: Actions) => {
  switch (action.type) {
    case SELECT_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
        isLoading: action.payload.roomId !== state.roomId,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.messages.concat(),
        chatRoomInfo: action.payload.chatRoomInfo,
      };
  }
  return state;
};
export default chatroomReducer;
