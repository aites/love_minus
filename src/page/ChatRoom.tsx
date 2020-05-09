import React from 'react';
import { Box, Button, TextareaAutosize } from '@material-ui/core';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import classes from './chatRoom.module.scss';
import { getCurrentUser } from '../modules/firebase';
import {
  getChatRoom,
  ChatMessage,
  postChatMessage,
  getChatMessageSnapShot,
  ChatRoom as ChatRoomModel,
} from '../modules/models/Chatroom';
import { UserInfo } from 'firebase';

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
  chatroomId?: string;
};
type ChatRoomState = {
  chatroomId?: string;
  messageList: ChatMessage[];
  chatRoomInfo?: ChatRoomModel;
  message: string;
  currentUser?: UserInfo;
};

export default class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {
  constructor(props: ChatRoomProps) {
    super(props);
    this.state = {
      chatroomId: props.chatroomId,
      messageList: [],
      message: '',
    };
    this.postMessage = this.postMessage.bind(this);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe() {}

  async setChatMessageSnapShot() {
    const currentUserUid = await getCurrentUser();
    if (this.props.chatroomId && currentUserUid) {
      const chatRoomInfo = await getChatRoom({ docId: this.props.chatroomId });
      if (chatRoomInfo) {
        getChatMessageSnapShot({ chatroomId: this.props.chatroomId, limit: 100 }, (list) => {
          this.setState({
            currentUser: currentUserUid,
            chatRoomInfo: chatRoomInfo,
            messageList: list,
          });
        }).then((unsubscribe) => (this.unsubscribe = unsubscribe));
      }
    }
  }
  async componentDidMount() {
    await this.setChatMessageSnapShot();
  }
  async componentDidUpdate(prev: ChatRoomProps) {
    if (this.props.chatroomId !== prev.chatroomId) {
      await this.setChatMessageSnapShot();
    }
  }

  async postMessage() {
    const chatRoomId = this.props.chatroomId;
    const message = this.state.message;
    if (chatRoomId && message) {
      await postChatMessage({
        chatroomId: chatRoomId,
        message: message,
      });
    }
  }
  render() {
    if (!this.state.chatRoomInfo || !this.state.currentUser) return <></>;
    const currentUserUid = this.state.currentUser.uid;
    const ownerInfo = this.state.chatRoomInfo.ownerInfo;
    const playerInfo = this.state.chatRoomInfo.playerInfo;
    const myUserInfo = currentUserUid === ownerInfo.author ? ownerInfo : playerInfo;
    const otherUserInfo = currentUserUid === playerInfo.author ? ownerInfo : playerInfo;
    return (
      <Box className={classes.chat}>
        <img className={classes.chat__character} src="/images/josei_13_b.png" alt="" />
        <Box className={classes.chatContentsWrap}>
          <Box className={classes.chatContents}>
            {this.state.messageList.map((message, i) => {
              const isMine = currentUserUid === message.ownerUid;
              console.log('isMine', isMine, currentUserUid, message.ownerUid);
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
