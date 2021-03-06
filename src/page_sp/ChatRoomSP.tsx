import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextareaAutosize, Modal, Fade, CircularProgress } from '@material-ui/core';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import classes from '../scss/page_sp/chatRoomSP.module.scss';
import { ChatMessage, ChatRoom as ChatRoomModel } from '../modules/models/Chatroom';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';
import { RootStateProps } from '../redux/reducers';
import ChatMessageSnapshot from '../object/FisebaseSnapshot/ChatMessageSnapshot';
import { sendMessage } from '../redux/actions/chatMessageAction';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import { Profile } from '../modules/models/Profile';
import ProfileModal from '../page_sp/object/ProfileModalSP';

interface MessageInfo {
  user: 'yours' | 'mine';
  sex: 'man' | 'woman';
  comment: string;
}

function UserSpeech(props: MessageInfo) {
  const sexClass = props.sex === 'man' ? classes.man : classes.woman;
  if (props.user === 'mine') {
    return (
      <Box className={classes.chatContents__speechWrap}>
        <Box className={ClassNames(classes.chatContents__speech, classes.speech__mine, sexClass)}>
          <span className={classes.mineBefore}></span>
          <span className={classes.mineAfter}></span>
          {props.comment}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={ClassNames(classes.chatContents__speechWrap, classes.your)}>
        <Box className={ClassNames(classes.chatContents__speech, classes.speech__your, sexClass)}>
          <span className={classes.yourBefore}></span>
          <span className={classes.yourAfter}></span>
          {props.comment}
        </Box>
      </Box>
    );
  }
}

type ChatRoomProps = {
  chatRoomId?: string;
  messages: ChatMessage[];
  chatRoomInfo?: ChatRoomModel;
  currentUser?: UserInfo | null;
  isLoading: boolean;
  sendMessage: (chatRoomId: string, message: string) => void;
};
type ChatRoomState = {
  message: string;
  scrollStopFlag: boolean;
  showProfile: Profile | null;
};

class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {
  constructor(props: ChatRoomProps) {
    super(props);
    this.state = {
      message: '',
      scrollStopFlag: false,
      showProfile: null,
    };
  }

  postMessage = () => {
    if (!this.props.chatRoomId || !this.state.message || !this.state.message.match(/\S/g))
      return false;
    const chatRoomId = this.props.chatRoomId;
    const message = this.state.message;
    this.props.sendMessage(chatRoomId, message);
    this.setState({ message: '' });
  };

  private displayHeight: number = 0;
  componentDidMount() {
    this.moveScrollBottom();
    this.displayHeight = window.innerHeight;
  }

  componentDidUpdate(prevProps: ChatRoomProps) {
    if (this.props.messages !== prevProps.messages) {
      if (this.state.scrollStopFlag === false) {
        this.moveScrollBottom();
      }
      this.setState({ message: '' });
    }
  }

  moveScrollBottom = () => {
    const $chatContents = document.querySelector('#chatContents');
    if ($chatContents) {
      const bottom = $chatContents.scrollHeight - $chatContents.clientHeight;
      $chatContents.scroll(0, bottom);
    }
  };

  watchScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
    const chatContentHeight =
      event.currentTarget.scrollHeight - event.currentTarget.clientHeight - 30;
    const currentScroll = event.currentTarget.scrollTop;
    if (chatContentHeight <= currentScroll) {
      if (this.state.scrollStopFlag === true) this.setState({ scrollStopFlag: false });
    } else {
      if (this.state.scrollStopFlag === false) this.setState({ scrollStopFlag: true });
    }
  };

  render() {
    const { showProfile } = this.state;
    if (!this.props.chatRoomId || !this.props.currentUser || !this.props.chatRoomInfo)
      return (
        <>
          <ChatMessageSnapshot />
        </>
      );
    const currentUserUid = this.props.currentUser.uid;
    const ownerInfo = this.props.chatRoomInfo.ownerInfo;
    const playerInfo = this.props.chatRoomInfo.playerInfo;
    const myUserInfo = currentUserUid === ownerInfo.author ? ownerInfo : playerInfo;
    const otherUserInfo = currentUserUid === playerInfo.author ? ownerInfo : playerInfo;
    return (
      <Box
        className={classes.chat}
        style={{
          minHeight: `calc(${this.displayHeight}px)`,
        }}
      >
        <Box className={classes.chatHeader}>
          <Link to="/mailbox">
            <ArrowBackIcon />
          </Link>
          {this.props.isLoading ? (
            <div className={classes.chat__character}>
              <CircularProgress style={{ margin: '0 auto' }} />
            </div>
          ) : (
            <>
              <Avatar
                alt="icon"
                src={
                  otherUserInfo.miniIcon !== ''
                    ? otherUserInfo.miniIcon
                    : otherUserInfo.sex === 'man'
                    ? '/images/dansei_0_b.png'
                    : '/images/josei_0_b.png'
                }
                className={classes.chatHeader__miniIcon}
                onClick={() => {
                  this.setState({ showProfile: otherUserInfo });
                }}
              />
              <span className={classes.chatHeader__name}>{otherUserInfo.name}</span>
            </>
          )}
        </Box>
        <ChatMessageSnapshot />
        <Box className={classes.chatContentsWrap}>
          <Box className={classes.chatContents} id="chatContents" onScroll={this.watchScroll}>
            {this.props.isLoading
              ? null
              : this.props.messages.map((message, i) => {
                  const isMine = currentUserUid === message.ownerUid;
                  const { user, sex } = isMine
                    ? { ...myUserInfo, user: 'mine' as 'mine' | 'yours' }
                    : { ...otherUserInfo, user: 'yours' as 'mine' | 'yours' };

                  return (
                    <UserSpeech
                      key={i.toString()}
                      user={user}
                      sex={sex}
                      comment={message.message}
                    />
                  );
                })}
          </Box>
          <Box className={classes.chatSendMessage}>
            <TextareaAutosize
              className={classes.chatSendMessage__textArea}
              aria-label="empty textarea"
              placeholder=""
              rowsMin={1}
              rowsMax={5}
              value={this.state.message}
              onKeyDown={(e) => {
                if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.keyCode === 13) {
                  this.postMessage();
                }
              }}
              onChange={(e) => {
                this.setState({ message: e.target.value });
              }}
            />
            <Button className={classes.chatSendMessage__button} onClick={this.postMessage}>
              <SendIcon className={classes.chatSendMessage__buttonIcon} />
            </Button>
          </Box>
        </Box>
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
                loginUserUid={ownerInfo.author}
                onCreateChatroom={(chatRoomId) => {
                  console.log('chatRoom', chatRoomId);
                }}
              />
            ) : (
              <div></div>
            )}
          </Fade>
        </Modal>
      </Box>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    chatRoomId: state.chatmessage.roomId,
    messages: state.chatmessage.messages,
    chatRoomInfo: state.chatmessage.chatRoomInfo,
    isLoading: state.chatmessage.isLoading,
    currentUser: state.firebase.user,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    sendMessage(chatRoomId: string, message: string) {
      dispatch(sendMessage(chatRoomId, message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
