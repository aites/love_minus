import firebase, { db } from '../../modules/firebase';
import React, { Component } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { ChatRoom, getChatMessageSnapShot, ChatMessage } from '../../modules/models/Chatroom';
import { RootStateProps } from '../../redux/reducers';
import { updateMessage } from '../../redux/reducers/chatMessageReducer';

type Props = {
  roomId?: string;
  updateChatMessage: (messages: ChatMessage[], chatRoomInfo: ChatRoom) => void;
};

class ChatMessageSnapshot extends Component<Props> {
  unscribes = {
    getChatMessageSnapShot: () => {},
  };
  async componentDidMount() {
    await this.setChatMessage();
  }

  async setChatMessage() {
    if (this.props.roomId !== '')
      this.unscribes.getChatMessageSnapShot = await getChatMessageSnapShot(
        { limit: 30, chatroomId: this.props.roomId || '' },
        ({ messages, chatRoomInfo }) => {
          console.log('asdadsa', messages);
          this.props.updateChatMessage(messages, chatRoomInfo);
        }
      );
  }

  async componentDidUpdate(prevProps: Props) {
    console.log('getChatMessageSnapShot', this.props);
    if (this.props.roomId != prevProps.roomId) {
      await this.setChatMessage();
    }
  }
  componentWillUnmount() {
    this.unscribes.getChatMessageSnapShot();
  }

  render() {
    return <></>;
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    roomId: state.chatmessage.roomId,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateChatMessage(messages: ChatMessage[], chatRoomInfo: ChatRoom) {
      dispatch(updateMessage(messages, chatRoomInfo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageSnapshot);
