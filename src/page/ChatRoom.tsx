import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClassNames from 'classnames';
import SendIcon from '@material-ui/icons/Send';
import CharacterImage from '../image/chat_background.svg';

const chatStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat: {
      position: 'relative',
      width: '100%',
      height: 'calc(100vh - 64px)',
      backgroundImage: `url(${CharacterImage})`,
      backgroundSize: 'contain',
      display: 'flex',
    },
    chat__character: {
      minWidth: '300px',
      flexBasis: '300px',
      height: 'calc(100vh - 64px)',
      objectFit: 'contain',
    },
    chatContentsWrap: {
      position: 'relative',
      margin: '16px 36px 16px 16px',
    },
    chatContents: {
      minWidth: 'calc(100% - 332px)',
      flexBasis: 'calc(100% - 332px)',
      marginBottom: '16px',
      padding: '16px',
      display: 'grid',
      backgroundColor: 'rgba(255,255,255,0.7)',
      border: '1px solid #FFF',
      borderRadius: '8px',
    },
    chatContents__name: {
      fontSize: '12px',
    },
    chatContents__speech: {
      border: '1px solid #6B6969',
      borderRadius: '8px',
      background: '#FFF',
      position: 'relative',
      fontSize: '20px',
      lineHeight: '1.5',
      padding: '8px',
      margin: '8px 0',
      display: 'inline-block',
    },
    speech__your: {
      marginRight: 'auto',
      marginLeft: '16px',
    },
    speech__mine: {
      marginRight: '16px',
      marginLeft: 'auto',
      maxWidth: 'calc(100%  -  50px)',
    },
    yourBefore: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '-16px',
      margin: 'auto',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '10px 17.3px 10px 0',
      borderColor: 'transparent #FFF transparent transparent',
      zIndex: 2,
    },
    yourAfter: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '-18px',
      margin: 'auto',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '10px 17.3px 10px 0',
      borderColor: 'transparent #6B6969 transparent transparent',
      zIndex: 1,
    },
    mineBefore: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: '-16px',
      margin: 'auto',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '10px 0 10px 17.3px',
      borderColor: 'transparent transparent transparent #FFF ',
      zIndex: 2,
    },
    mineAfter: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: '-18px',
      margin: 'auto',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '10px 0 10px 17.3px',
      borderColor: 'transparent transparent transparent #6B6969 ',
      zIndex: 1,
    },
    man: {
      color: '#6495ED',
    },
    woman: {
      color: '#FC319F',
    },
    chatSendMessage: {
      display: 'flex',
      position: 'relative',
      bottom: 0,
    },
    chatSendMessage__button: {
      width: '108px',
      height: '52px',
      backgroundColor: '#3E87F8',
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
    },
    chatSendMessage__textArea: {
      width: 'calc(100% - 108px)',
      height: '52px',
      border: '1px solid #676767',
      borderRadius: '8px',
      fontSize: '20px',
      lineHeight: '1.5',
      padding: '8px',
      marginRight: '12px',
      boxSizing: 'border-box',
    },
  })
);

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
  const classes = chatStyles();
  const sexClass = props.sex === 'man' ? classes.man : classes.woman;
  if (props.user === 'mine') {
    return (
      <Box className={ClassNames(classes.chatContents__speech, classes.speech__mine, sexClass)}>
        <Box className={classes.chatContents__name}>{props.name}</Box>
        <span className={classes.mineBefore}></span>
        <span className={classes.mineAfter}></span>
        {props.comment}
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

export default function ChatRoom() {
  const classes = chatStyles();

  const onKeyDown = (event: React.KeyboardEvent) => {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode === ENTER_KEY_CODE) {
      console.log('test');
    }
  };
  return (
    <Box className={classes.chat}>
      <img className={classes.chat__character} src="/images/dansei_01_b.png" alt="" />
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
          <textarea
            className={classes.chatSendMessage__textArea}
            onKeyDown={(e) => onKeyDown(e)}
          ></textarea>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.chatSendMessage__button}
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
