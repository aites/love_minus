import React from 'react';
import { Grid, Divider, Typography, CircularProgress, Box } from '@material-ui/core';
import ChatRoom from './ChatRoom';
import classes from './mailBox.module.scss';
import { ChatRoom as ChatRoomModel, getChatRoomsSnapShot } from '../modules/models/Chatroom';
import { timestampToString, getCurrentUser } from '../modules/firebase';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import ChatroomListSnapshot from '../object/FisebaseSnapshot/ChatroomListSnapshot';

export interface MailBoxProps {
  roomId?: string;
  isLoading: boolean;
  chatrooms: ChatRoomModel[];
  updateChatRoom: Function;
}
export interface MailBoxState {
  chatRoomList: ChatRoomModel[];
  progress: number;
  currentUserUID: string;
}

class MailBox extends React.Component<MailBoxProps, MailBoxState> {
  constructor(props: MailBoxProps) {
    super(props);
    this.state = {
      chatRoomList: [],
      progress: 0,
      currentUserUID: '',
    };
    this.onSelectChatRoom = this.onSelectChatRoom.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidUpdate(prevProps: MailBoxProps) {
    console.log('MailBox componentDidUpdate', this.props);
    if (this.props.roomId !== prevProps.roomId) {
      console.log('componentDidUpdate', this.props);
    }
  }
  unsubscribe() {}
  async componentDidMount() {
    const currentUserUID = (await getCurrentUser())?.uid || '';
  }

  onSelectChatRoom(roomId?: string) {
    if (roomId) {
      this.props.updateChatRoom(roomId);
    }
  }

  WarningBox = (text: string) => {
    return (
      <Box className={classes.warningBox__contents}>
        <HelpOutline className={classes.warningBox__infoIcon}></HelpOutline>
        <span className={classes.warningBox__infoText}>{text}</span>
      </Box>
    );
  };

  render() {
    const { currentUserUID } = this.state;
    const { isLoading, chatrooms } = this.props;
    return (
      <Grid container component="main" className={classes.main}>
        <ChatroomListSnapshot />
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
          {isLoading ? (
            <CircularProgress variant="determinate" />
          ) : (
            chatrooms.map((room: ChatRoomModel, i) => {
              const userInfo = room.ownerUid === currentUserUID ? room.playerInfo : room.ownerInfo;
              return (
                <>
                  <Grid
                    key={room.docId}
                    container
                    wrap="nowrap"
                    className={classes.mailListRow}
                    onClick={() => this.onSelectChatRoom(room.docId)}
                  >
                    <Grid item>
                      <img className={classes.image} src={userInfo.miniIcon} alt="" />
                    </Grid>
                    <Grid item>
                      <Typography>{userInfo.name}</Typography>
                      <Typography noWrap variant="caption">
                        {room.lastMessage}
                      </Typography>
                      <Typography noWrap variant="caption">
                        {timestampToString(room.updatedAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider key={room.docId + 'div'}></Divider>
                </>
              );
            })
          )}
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={classes.content}>
          {!isLoading && !this.props.roomId ? (
            this.WarningBox(
              '左の一覧からトークしたい人を選んでください。クリックするとトーク画面に切り替わります。'
            )
          ) : (
            <ChatRoom chatroomId={this.props.roomId} />
          )}
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  const roomId = new URLSearchParams(state.router.location.search).get('r') || undefined;
  return {
    roomId: roomId,
    ...state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateChatRoom(roomId: ChatRoom) {
      return dispatch(push(`/mailbox?r=${roomId}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailBox);
