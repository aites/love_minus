import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChatRoom, getChatRoomsSnapShot } from '../../modules/models/Chatroom';
import { RootStateProps } from '../../redux/reducers';
import { UPDATE_CHATLIST } from '../../redux/reducers/MailBoxReducer';

type Props = {
  updateChatRoom: (chatrooms: ChatRoom[]) => void;
};

class ChatroomListSnapshot extends Component<Props> {
  unscribes = {
    getChatRoomsSnapShot: () => {},
    onUpdateTimeline: () => {},
  };
  async componentDidMount() {
    this.unscribes.getChatRoomsSnapShot = await getChatRoomsSnapShot(
      { limit: 30 },
      (chatrooms: ChatRoom[]) => {
        console.log('ChatroomSnapshot', chatrooms);
        this.props.updateChatRoom(chatrooms);
      }
    );
  }
  componentWillUnmount() {
    this.unscribes.getChatRoomsSnapShot();
  }

  render() {
    return <></>;
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    //    chatroom: state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateChatRoom(chatrooms: ChatRoom[]) {
      dispatch({
        type: UPDATE_CHATLIST,
        chatrooms: chatrooms,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomListSnapshot);
