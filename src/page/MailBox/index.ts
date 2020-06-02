import { MailBox } from './MailBox';
import { connect } from 'react-redux';
import { selectRoom } from '../../redux/reducers/chatMessageReducer';
import { push } from 'connected-react-router';
import { RootStateProps } from '../../redux/reducers';

function mapStateToProps(state: RootStateProps) {
  return {
    roomId: state.chatmessage.roomId,
    currentUserUID: state.firebase.user?.uid || '',
    ...state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateChatRoom(roomId: string) {
      dispatch(selectRoom(roomId || ''));
      dispatch(push(`/mailbox?r=${roomId}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailBox);
