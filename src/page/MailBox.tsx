import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Grid, Divider, Typography, CircularProgress } from '@material-ui/core';
import ChatRoom from './ChatRoom';
import classes from './mailBox.module.scss';
import { ChatRoom as ChatRoomModel, getChatRoomsSnapShot } from '../modules/models/Chatroom';
import { timestampToString } from '../modules/firebase';
import { getChatroomId } from '../modules/searchParams';

interface MailBoxProps extends RouteComponentProps<{}> {
  selectRoomId?: string;
}
interface MailBoxState {
  chatRoomList: ChatRoomModel[];
  isLoading: boolean;
  progress: number;
  selectRoomId?: string;
}

class MailBox extends React.Component<MailBoxProps, MailBoxState> {
  constructor(props: MailBoxProps) {
    super(props);
    this.state = {
      chatRoomList: [],
      isLoading: true,
      progress: 0,
      selectRoomId: props.selectRoomId,
    };
    this.onSelectChatRoom = this.onSelectChatRoom.bind(this);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe() {}
  async componentDidMount() {
    this.unsubscribe = await getChatRoomsSnapShot({ limit: 30 }, (chatrooms) => {
      this.setState({
        chatRoomList: chatrooms,
        isLoading: false,
      });
    });
  }

  onSelectChatRoom(roomId?: string) {
    if (roomId) {
      const url = new URL(document.URL);
      url.searchParams.delete('r');
      url.searchParams.append('r', roomId);
      this.props.history.push(url.pathname + url.search);
    }
  }
  render() {
    return (
      <Grid container component="main" className={classes.main}>
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
          {this.state.isLoading ? (
            <CircularProgress variant="determinate" value={this.state.progress} />
          ) : (
            this.state.chatRoomList.map((room: ChatRoomModel, i) => {
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
                      <img className={classes.image} src={room.ownerInfo.miniIcon} alt="" />
                    </Grid>
                    <Grid item>
                      <Typography>{room.ownerInfo.name}</Typography>
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
        <Grid item xs={12} sm={8} md={9} className={classes.content} style={{ overflow: 'hidden' }}>
          <ChatRoom chatroomId={getChatroomId()} />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(MailBox);
