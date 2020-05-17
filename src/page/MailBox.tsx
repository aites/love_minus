import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Grid, Divider, Typography, CircularProgress, Box } from '@material-ui/core';
import ChatRoom from './ChatRoom';
import classes from './mailBox.module.scss';
import { ChatRoom as ChatRoomModel, getChatRoomsSnapShot } from '../modules/models/Chatroom';
import { timestampToString, getCurrentUser } from '../modules/firebase';
import { getChatroomId } from '../modules/searchParams';
import HelpOutline from '@material-ui/icons/HelpOutline';

interface MailBoxProps extends RouteComponentProps<{}> {
  selectRoomId?: string;
}
interface MailBoxState {
  chatRoomList: ChatRoomModel[];
  isLoading: boolean;
  progress: number;
  selectRoomId?: string;
  isNoChat: boolean;
  currentUserUID: string;
}

class MailBox extends React.Component<MailBoxProps, MailBoxState> {
  constructor(props: MailBoxProps) {
    super(props);
    this.state = {
      chatRoomList: [],
      isLoading: true,
      progress: 0,
      selectRoomId: props.selectRoomId,
      isNoChat: true,
      currentUserUID: '',
    };
    this.onSelectChatRoom = this.onSelectChatRoom.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe() {}
  async componentDidMount() {
    const currentUserUID = (await getCurrentUser())?.uid || '';
    this.unsubscribe = await getChatRoomsSnapShot({ limit: 30 }, (chatrooms) => {
      this.setState({
        chatRoomList: chatrooms,
        isLoading: false,
        currentUserUID: currentUserUID,
      });
    });
  }

  onSelectChatRoom(roomId?: string) {
    if (roomId) {
      this.setState({
        isNoChat: false,
      });
      const url = new URL(document.URL);
      url.searchParams.delete('r');
      url.searchParams.append('r', roomId);
      this.props.history.push(url.pathname + url.search);
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
    return (
      <Grid container component="main" className={classes.main}>
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
          {this.state.isLoading ? (
            <CircularProgress variant="determinate" />
          ) : (
            this.state.chatRoomList.map((room: ChatRoomModel, i) => {
              const userInfo =
                room.ownerUid === this.state.currentUserUID ? room.playerInfo : room.ownerInfo;
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
          {!this.state.isLoading && this.state.isNoChat ? (
            this.WarningBox(
              '左の一覧からトークしたい人を選んでください。クリックするとトーク画面に切り替わります。'
            )
          ) : (
            <ChatRoom chatroomId={getChatroomId()} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(MailBox);
