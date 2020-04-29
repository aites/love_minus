import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ClassNames from 'classnames';

const chatStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat: {
      display: 'flex',
    },
    chat__imageWrap: {
      width: '300px',
      height: 'calc(100vh - 64px)',
      position: 'relative',
      marginRight: 'auto',
    },
    chat__image: {
      width: '300px',
      height: 'calc(100vh - 64px)',
      objectFit: 'contain',
    },
    chatContentsWrap: {
      position: 'relative',
    },
    chatContentsWrap__background: {
      width: '100%',
      height: 'calc(100vh - 64px)',
      objectFit: 'cover',
    },
    chatContents: {
      position: 'absolute',
      top: 0,
      width: '100%',
      display: 'grid',
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
      margin: '8px',
      display: 'inline-block',
    },
    speech__mine: {
      marginLeft: '40px',
    },
    speech__your: {
      marginRight: '40px',
      marginLeft: 'auto',
    },
    mineBefore: {
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
    mineAfter: {
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
    yourBefore: {
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
    yourAfter: {
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
  return (
    <Box className={classes.chat}>
      <Box className={classes.chatContentsWrap}>
        <img
          className={classes.chatContentsWrap__background}
          src="/images/chat_background.png"
          alt=""
        />
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
        </Box>
      </Box>
      <Box className={classes.chat__imageWrap}>
        <img className={classes.chat__image} src="/images/atobe.jpg" alt="" />
      </Box>
    </Box>
  );
}
