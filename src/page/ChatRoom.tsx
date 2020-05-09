import React from 'react';
import { Box, Button, TextareaAutosize } from '@material-ui/core';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import classes from './chatRoom.module.scss';
import {
  ChatMessage,
  getChatMessage,
  postChatMessage,
  getChatMessageSnapShot,
} from '../modules/models/Chatroom';

interface MessageInfo {
  user: string;
  sex: string;
  name: string;
  comment: string;
}

// 下記はダミーデータ
const status: MessageInfo = {
  user: 'your',
  sex: 'man',
  name: '跡部',
  comment: '海老煎餅をやろうか？',
};

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
  message: string;
};

export default class ChatRoom extends React.Component<ChatRoomProps, ChatRoomState> {
  constructor(props: ChatRoomProps) {
    super(props);
    this.state = { chatroomId: props.chatroomId, messageList: [], message: '' };
    this.postMessage = this.postMessage.bind(this);
  }
  componentDidMount() {
    console.log('chatroomId', this.state.chatroomId);
    if (this.state.chatroomId) {
    }
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe() {}

  componentDidUpdate(prev: ChatRoomProps) {
    if (this.props.chatroomId !== prev.chatroomId) {
      if (this.props.chatroomId) {
        getChatMessageSnapShot({ chatroomId: this.props.chatroomId, limit: 100 }, (list) => {
          this.setState({ messageList: list });
        }).then((unsubscribe) => (this.unsubscribe = unsubscribe));
      }
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
    return (
      <Box className={classes.chat}>
        <img className={classes.chat__character} src="/images/josei_13_b.png" alt="" />
        <Box className={classes.chatContentsWrap}>
          <Box className={classes.chatContents}>
            {this.state.messageList.map((message, i) => {
              return (
                <UserSpeech
                  key={i.toString()}
                  user={status.user}
                  sex={status.sex}
                  name={status.name}
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
