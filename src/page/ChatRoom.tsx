import React from 'react';
import { Box, Button } from '@material-ui/core';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import chatStyles from '../style/chatRoom.module.scss';

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
  const sexClass = props.sex === 'man' ? chatStyles.man : chatStyles.woman;
  if (props.user === 'mine') {
    return (
      <Box
        className={ClassNames(chatStyles.chatContents__speech, chatStyles.speech__mine, sexClass)}
      >
        <Box className={chatStyles.chatContents__name}>{props.name}</Box>
        <span className={chatStyles.mineBefore}></span>
        <span className={chatStyles.mineAfter}></span>
        {props.comment}
      </Box>
    );
  } else {
    return (
      <Box
        className={ClassNames(chatStyles.chatContents__speech, chatStyles.speech__your, sexClass)}
      >
        <Box className={chatStyles.chatContents__name}>{props.name}</Box>
        <span className={chatStyles.yourBefore}></span>
        <span className={chatStyles.yourAfter}></span>
        {props.comment}
      </Box>
    );
  }
}

export default function ChatRoom() {
  const onKeyDown = (event: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      console.log('test');
    }
  };
  return (
    <Box className={chatStyles.chat}>
      <img className={chatStyles.chat__character} src="/images/dansei_01_b.png" alt="" />
      <Box className={chatStyles.chatContentsWrap}>
        <Box className={chatStyles.chatContents}>
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
        <Box className={chatStyles.chatSendMessage}>
          <textarea
            className={chatStyles.chatSendMessage__textArea}
            onKeyDown={(e) => onKeyDown(e)}
          ></textarea>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={chatStyles.chatSendMessage__button}
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
