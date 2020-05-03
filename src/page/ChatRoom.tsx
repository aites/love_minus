import React from 'react';
import { Box, Button, TextareaAutosize } from '@material-ui/core';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import classes from './chatRoom.module.scss';

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

const status2: MessageInfo = {
  user: 'mine',
  sex: 'woman',
  name: '自分',
  comment:
    'ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！ほしい！！ちょうだい！！',
};

const status3: MessageInfo = {
  user: 'your',
  sex: 'man',
  name: '跡部',
  comment:
    '跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国跡部王国',
};

const status4: MessageInfo = {
  user: 'mine',
  sex: 'woman',
  name: '自分',
  comment: '跡部王国うれしい',
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
      <Box className={ClassNames(classes.chatContents__speech, classes.speech__your, sexClass)}>
        <Box className={classes.chatContents__name}>{props.name}</Box>
        <span className={classes.yourBefore}></span>
        <span className={classes.yourAfter}></span>
        {props.comment}
      </Box>
    );
  }
}

export default class ChatRoom extends React.Component {
  render() {
    return (
      <Box className={classes.chat}>
        <img className={classes.chat__character} src="/images/josei_13_b.png" alt="" />
        <Box className={classes.chatContentsWrap}>
          <Box className={classes.chatContents}>
            <UserSpeech
              user={status.user}
              sex={status.sex}
              name={status.name}
              comment={status.comment}
            />
            <UserSpeech
              user={status2.user}
              sex={status2.sex}
              name={status2.name}
              comment={status2.comment}
            />
            <UserSpeech
              user={status3.user}
              sex={status3.sex}
              name={status3.name}
              comment={status3.comment}
            />
            <UserSpeech
              user={status4.user}
              sex={status4.sex}
              name={status4.name}
              comment={status4.comment}
            />
          </Box>
          <Box className={classes.chatSendMessage}>
            <TextareaAutosize
              className={classes.chatSendMessage__textArea}
              aria-label="empty textarea"
              placeholder=""
              rowsMin={1}
            />
            <Button className={classes.chatSendMessage__button}>
              <SendIcon className={classes.chatSendMessage__buttonIcon} />
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
}
