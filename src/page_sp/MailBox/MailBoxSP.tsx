import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Divider,
  Typography,
  CircularProgress,
  List,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Box,
} from '@material-ui/core';
import classes from '../../scss/page_sp/mailBoxSP.module.scss';
import { ChatRoom as ChatRoomModel } from '../../modules/models/Chatroom';
import { timestampToString } from '../../modules/firebase';
import ChatroomListSnapshot from '../../object/FisebaseSnapshot/ChatroomListSnapshot';
import ChatRoom from '../ChatRoomSP';
import { connect } from 'react-redux';
import { selectRoom } from '../../redux/reducers/chatMessageReducer';
import { leaveRoom } from '../../redux/actions/chatRoomAction';
import { push } from 'connected-react-router';
import { RootStateProps } from '../../redux/reducers';
import { RouteComponentProps } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';

export interface MailBoxSPProps
  extends RouteComponentProps<{
    roomId: string;
  }> {
  roomId?: string;
  isLoading: boolean;
  chatrooms: ChatRoomModel[];
  currentUserUID: string;
}
interface MailBoxSPInnerProps extends MailBoxSPProps {
  updateChatRoom: Function;
  leaveChatRoom: Function;
  setChatRoomId: (roomId: string) => void;
}

type MailBoxStates = {
  leaveRoomId?: string;
  dialog: boolean;
};

export class MailBoxSP extends React.Component<MailBoxSPInnerProps, MailBoxStates> {
  constructor(props: MailBoxSPInnerProps) {
    super(props);
    this.state = {
      leaveRoomId: '',
      dialog: false,
    };
  }

  componentDidMount() {
    this.props.setChatRoomId(this.props.roomId || '');
  }
  componentWillReceiveProps(nextProps: MailBoxSPInnerProps) {
    if (this.props.roomId !== nextProps.roomId) {
      this.props.setChatRoomId(nextProps.roomId || '');
    }
  }

  render() {
    const { isLoading, chatrooms, currentUserUID, roomId } = this.props;
    const handleClickOpen = (id?: string) => {
      this.setState({ dialog: true, leaveRoomId: id });
    };

    const handleClose = () => {
      this.setState({ dialog: false });
    };
    return (
      <>
        <ChatroomListSnapshot />
        <ChatRoom />
        {!roomId ? (
          <List>
            {isLoading ? (
              <CircularProgress variant="determinate" />
            ) : (
              chatrooms.map((room: ChatRoomModel) => {
                const userInfo =
                  room.ownerUid === currentUserUID ? room.playerInfo : room.ownerInfo;
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
                      <Grid item xs zeroMinWidth>
                        <Typography>{userInfo.name}</Typography>
                        <Typography noWrap display="block" variant="caption">
                          {room.lastMessage}
                        </Typography>
                        <Typography noWrap display="block" variant="caption">
                          {timestampToString(room.updatedAt)}
                        </Typography>
                      </Grid>
                      <CloseIcon
                        className={classes.closeIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickOpen(room.docId);
                        }}
                      />
                    </Grid>
                    <Divider key={room.docId + 'div'}></Divider>
                  </>
                );
              })
            )}
            {chatrooms.length === 0 ? (
              <Box className={classes.warningBox__contents}>
                <HelpOutline className={classes.warningBox__infoIcon}></HelpOutline>
                <span className={classes.warningBox__infoText}>
                  タイムラインからトークしたい人を選んでください。
                </span>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Link to="/timeline" className={classes.timeLineLink}>
                    <Button variant="outlined" color="primary">
                      タイムラインから探す
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : null}
            <Dialog
              open={this.state.dialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">このトークルームから退室しますか？</DialogTitle>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleClose();
                    this.props.leaveChatRoom(this.state.leaveRoomId);
                  }}
                  color="primary"
                >
                  はい
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                  いいえ
                </Button>
              </DialogActions>
            </Dialog>
          </List>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function mapStateToProps(state: RootStateProps, props: MailBoxSPProps) {
  return {
    roomId: props.match.params.roomId,
    currentUserUID: state.firebase.user?.uid || '',
    ...state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    setChatRoomId(roomId: string) {
      dispatch(selectRoom(roomId));
    },
    updateChatRoom(roomId: string) {
      dispatch(push(`/mailbox/${roomId}`));
    },
    leaveChatRoom(roomId: string) {
      dispatch(leaveRoom(roomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailBoxSP);
