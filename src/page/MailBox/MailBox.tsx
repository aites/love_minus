import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Divider,
  Typography,
  CircularProgress,
  Box,
  Modal,
  Fade,
  Button,
} from '@material-ui/core';
import classes from '../../scss/page/mailBox.module.scss';
import { ChatRoom as ChatRoomModel } from '../../modules/models/Chatroom';
import { timestampToString } from '../../modules/firebase';
import HelpOutline from '@material-ui/icons/HelpOutline';
import ChatroomListSnapshot from '../../object/FisebaseSnapshot/ChatroomListSnapshot';
import ChatRoom from '../ChatRoom';
import { Profile } from '../../modules/models/Profile';
import ProfileModal from '../../object/ProfileModal';

export interface MailBoxProps {
  roomId?: string;
  isLoading: boolean;
  chatrooms: ChatRoomModel[];
  currentUserUID: string;
}
interface MailBoxInnerProps extends MailBoxProps {
  updateChatRoom: Function;
  setChatRoomId: (roomId: string) => void;
}
type MailBoxState = {
  showProfile: Profile | null;
};

export class MailBox extends React.Component<MailBoxInnerProps, MailBoxState> {
  constructor(props: MailBoxInnerProps) {
    super(props);
    this.state = {
      showProfile: null,
    };
  }
  componentDidMount() {
    this.props.setChatRoomId(this.props.roomId || '');
  }
  componentWillReceiveProps(nextProps: MailBoxInnerProps) {
    if (this.props.roomId !== nextProps.roomId) {
      this.props.setChatRoomId(nextProps.roomId || '');
    }
  }
  render() {
    const { isLoading, chatrooms, currentUserUID } = this.props;
    const { showProfile } = this.state;

    return (
      <Grid container component="main" className={classes.main}>
        <ChatroomListSnapshot />
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
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
                      <img
                        className={classes.image}
                        src={userInfo.miniIcon}
                        alt=""
                        onClick={() => {
                          this.setState({ showProfile: userInfo });
                        }}
                      />
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
          {!chatrooms.length ? (
            <Box className={classes.mailBox}>
              <p>
                トークする人がいないです
                <br />
                タイムラインからトークする人を探そう
              </p>
              <Link to="/timeline" className={classes.timeLineLink}>
                <Button variant="outlined" color="primary">
                  タイムラインから探す
                </Button>
              </Link>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={classes.content}>
          {!this.props.roomId ? (
            <Box className={classes.warningBox__contents}>
              <HelpOutline className={classes.warningBox__infoIcon}></HelpOutline>
              <span className={classes.warningBox__infoText}>
                左の一覧からトークしたい人を選んでください。クリックするとトーク画面に切り替わります。
              </span>
            </Box>
          ) : (
            <ChatRoom />
          )}
        </Grid>
        <Modal
          disableAutoFocus
          open={showProfile != null}
          onClose={() => {
            this.setState({ showProfile: null });
          }}
        >
          <Fade in={showProfile != null}>
            {showProfile ? (
              <ProfileModal
                profile={showProfile}
                loginUserUid={showProfile.author}
                onCreateChatroom={(chatRoomId) => {
                  console.log('chatRoom', chatRoomId);
                }}
              />
            ) : (
              <div></div>
            )}
          </Fade>
        </Modal>
      </Grid>
    );
  }
}
