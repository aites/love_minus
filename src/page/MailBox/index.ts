import { MailBox, MailBoxProps } from './MailBox';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStateProps } from '../../redux/reducers';
import { withRouter, RouteComponentProps } from 'react-router';
import { selectRoom } from '../../redux/reducers/chatMessageReducer';
import { leaveRoom } from '../../redux/actions/chatRoomAction';

interface Props
  extends RouteComponentProps<{
    roomId: string;
  }> {}

function mapStateToProps(state: RootStateProps, props: Props): MailBoxProps {
  return {
    roomId: props.match.params.roomId,
    currentUserUID: state.firebase.user?.uid || '',
    ...state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function, props: Props) => {
  return {
    setChatRoomId(roomId: string) {
      console.log('props', props);
      dispatch(selectRoom(roomId));
    },
    updateChatRoom(roomId: string) {
      console.log('props', props);
      //      dispatch(selectRoom(roomId));
      dispatch(push(`/mailbox/${roomId}`));
    },
    leaveChatRoom(roomId: string) {
      dispatch(leaveRoom(roomId));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailBox));
