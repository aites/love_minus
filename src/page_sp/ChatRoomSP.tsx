import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, TextareaAutosize } from '@material-ui/core';
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

interface MessageInfo {
  user: 'yours' | 'mine';
  sex: 'man' | 'woman';
  name: string;
  comment: string;
}

function UserSpeech(props: MessageInfo) {
  const sexClass = props.sex === 'man' ? classes.man : classes.woman;
  if (props.user === 'mine') {
    return (
      <Box className={classes.chatContents__speechWrap}>
        <Box className={ClassNames(classes.chatContents__speech, classes.speech__mine, sexClass)}>
          <Box className={classes.chatContents__name}>{props.name}</Box>
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
          <Box className={classes.chatContents__name}>{props.name}</Box>
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
  sendMessage: (chatRoomId: string, message: string) => void;
};
type ChatRoomState = {
  message: string;
  scrollStopFlag: boolean;
};

class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {
  constructor(props: ChatRoomProps) {
    super(props);
    this.state = {
      message: '',
      scrollStopFlag: false,
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

  componentDidMount() {
    this.moveScrollBottom();
  }

  componentDidUpdate(prevProps: ChatRoomProps) {
    if (this.props.messages !== prevProps.messages) {
      if (this.state.scrollStopFlag === false) {
        this.moveScrollBottom();
      }
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
      <Box className={classes.chat}>
        <a className={classes.backIcon}>
          <ArrowBackIcon />
        </a>
        <ChatMessageSnapshot />
        <img
          className={classes.chat__character}
          src={
            otherUserInfo.icon !== ''
              ? otherUserInfo.icon
              : otherUserInfo.sex === 'man'
              ? '/images/dansei_0_b.png'
              : '/images/josei_0_b.png'
          }
          alt=""
        />
        <Box className={classes.chatContentsWrap}>
          <Box className={classes.chatContents} id="chatContents" onScroll={this.watchScroll}>
            {this.props.messages.map((message, i) => {
              const isMine = currentUserUid === message.ownerUid;
              const { user, sex, name } = isMine
                ? { ...myUserInfo, user: 'mine' as 'mine' | 'yours' }
                : { ...otherUserInfo, user: 'yours' as 'mine' | 'yours' };

              return (
                <UserSpeech
                  key={i.toString()}
                  user={user}
                  sex={sex}
                  name={name}
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
      </Box>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    chatRoomId: state.chatmessage.roomId,
    messages: state.chatmessage.messages,
    chatRoomInfo: state.chatmessage.chatRoomInfo,
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
