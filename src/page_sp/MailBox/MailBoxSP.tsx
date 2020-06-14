import React from 'react';
import { Grid, Divider, Typography, CircularProgress, List } from '@material-ui/core';
import classes from '../../scss/page_sp/mailBoxSP.module.scss';
import { ChatRoom as ChatRoomModel } from '../../modules/models/Chatroom';
import { timestampToString } from '../../modules/firebase';
import ChatroomListSnapshot from '../../object/FisebaseSnapshot/ChatroomListSnapshot';
import ChatRoom from '../ChatRoomSP';
import { connect } from 'react-redux';
import { selectRoom } from '../../redux/reducers/chatMessageReducer';
import { push } from 'connected-react-router';
import { RootStateProps } from '../../redux/reducers';

export interface MailBoxSPProps {
  roomId?: string;
  isLoading: boolean;
  chatrooms: ChatRoomModel[];
  currentUserUID: string;
  updateChatRoom: Function;
}

export class MailBoxSP extends React.Component<MailBoxSPProps> {
  render() {
    const { isLoading, chatrooms, currentUserUID } = this.props;
    return (
      <>
        <ChatroomListSnapshot />
        <ChatRoom />
        <List>
          {isLoading ? (
            <CircularProgress variant="determinate" />
          ) : (
            chatrooms.map((room: ChatRoomModel) => {
              const userInfo = room.ownerUid === currentUserUID ? room.playerInfo : room.ownerInfo;
              return (
                <>
                  <Grid
                    key={room.docId}
                    container
                    wrap="nowrap"
                    className={classes.mailListRow}
                    onClick={() => this.props.updateChatRoom(room.docId)}
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
        </List>
      </>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MailBoxSP);
