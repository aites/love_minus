import React from 'react';
import { Grid, Divider, Typography, CircularProgress } from '@material-ui/core';
import ChatRoom from './ChatRoom';
import classes from './mailBox.module.scss';
import { ChatRoom as ChatRoomModel, getChatRooms } from '../modules/models/Chatroom';

type MailBoxProps = {};
type MailBoxState = {
  chatRoomList: ChatRoomModel[];
  isLoading: boolean;
  progress: number;
};

export default class MailBox extends React.Component<MailBoxProps, MailBoxState> {
  constructor(props: MailBoxProps) {
    super(props);
    this.state = {
      chatRoomList: [],
      isLoading: true,
      progress: 0,
    };
  }
  componentDidMount() {
    getChatRooms({ limit: 30 }).then((chatrooms) => {
      console.log(chatrooms);
      this.setState({
        chatRoomList: chatrooms,
        isLoading: false,
      });
    });
  }
  render() {
    return (
      <Grid container component="main" className={classes.main}>
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
          {this.state.isLoading ? (
            <CircularProgress variant="determinate" value={this.state.progress} />
          ) : (
            this.state.chatRoomList.map((room, i) => {
              return (
                <>
                  <Grid
                    key={`mailListRow${i}`}
                    container
                    wrap="nowrap"
                    className={classes.mailListRow}
                  >
                    <Grid item>
                      <img className={classes.image} src={room.ownerInfo.miniIcon} alt="" />
                    </Grid>
                    <Grid item>
                      <Typography>{room.ownerInfo.name}</Typography>
                      <Typography noWrap variant="caption">
                        もしもし〜
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider></Divider>
                </>
              );
            })
          )}
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={classes.content} style={{ overflow: 'hidden' }}>
          <ChatRoom chatroomId="4lyJt4c6OBsoUocSCcgh" />
        </Grid>
      </Grid>
    );
  }
}
