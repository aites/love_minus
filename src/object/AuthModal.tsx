import React, { Component } from 'react';
import firebase from '../modules/firebase';
import {
  createStyles,
  makeStyles,
  Theme,
  Paper,
  Button,
  Popper,
  Typography,
  Fade,
  Popover,
  TextField,
  InputLabel,
  Box,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';
import classes from './authModal.module.scss';

type AuthModalProps = {};
type AuthModalStates = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  email: string;
  userInfo: UserInfo | null;
};
type UserInfo = {
  uid: string;
  email: string;
};

class AuthModal extends Component<AuthModalProps, AuthModalStates> {
  constructor(props: AuthModalProps) {
    super(props);
    this.state = { open: false, anchorEl: null, email: '', userInfo: null };
  }

  async componentDidMount() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // メールリンクのURLからきた場合
      let email = window.localStorage.getItem('emailForSignIn');
      while (!email) {
        // 保存されたメアドが見つからなかったので入力を求める
        email = window.prompt('Please provide your email for confirmation');
      }
      const { additionalUserInfo } = await firebase
        .auth()
        .signInWithEmailLink(email, window.location.href);
    }
    firebase.auth().onAuthStateChanged((user) => {
      //      this.setState({ user });
      if (user != null) {
        this.setState({
          userInfo: {
            uid: user.uid,
            email: user.email || '',
          },
        });
      }
    });
  }
  //componentDidMountはrenderが実行された後に行われる。データの受け渡しが可能な状態になったら下記のコードが実行されていく。
  //onAuthstateChangeでuserにログインしたユーザーの情報を与える

  async login(email: string) {
    window.localStorage.setItem('emailForSignIn', email);

    await firebase.auth().sendSignInLinkToEmail(email, {
      url: window.location.href,
      handleCodeInApp: true,
    });
  }
  //signInWithRedirectでGoogleのログインページに接続して、Google プロバイダ オブジェクトのインスタンスを作成する。
  logout() {
    console.log('logout click');
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logouted');
        this.setState({ userInfo: null });
      });
  }

  GuestPaper = () => {
    return (
      <Paper className={classes.modal}>
        <Box>
          <h2 className={classes.modal__head}>新規登録</h2>
          <TextField
            id="name"
            label="メールアドレス"
            variant="outlined"
            className={classes.modal__inputText}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              this.login(this.state.email);
            }}
          >
            登録
          </Button>
          {this.LoginPaper()}
          {this.InfoContents()}
        </Box>
      </Paper>
    );
  };

  LoginPaper = () => {
    return (
      <Box>
        <h2 className={classes.modal__head}>ログイン</h2>
        <TextField
          id="name"
          label="メールアドレス"
          variant="outlined"
          className={classes.modal__inputText}
          onChange={(e) => {
            this.setState({ email: e.target.value });
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            this.login(this.state.email);
          }}
        >
          ログイン
        </Button>
      </Box>
    );
  };

  InfoContents = () => {
    return (
      <Box className={classes.modal__infoBox}>
        <HelpOutline className={classes.modal__infoIcon}></HelpOutline>
        <span>
          メールアドレス宛に1回限り使えるログイン用の認証リンクを送ります。そちらのリンクをクリックすることでログインとなります。
        </span>
      </Box>
    );
  };

  userPaper = () => {
    return (
      <>
        <InputLabel>{this.state.userInfo?.uid}</InputLabel>
        <Button onClick={this.logout.bind(this)}>LogOut</Button>
      </>
    );
  };

  render() {
    return (
      <>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            this.setState({ open: true, anchorEl: e.currentTarget });
          }}
        >
          ログイン/アカウント登録
        </Button>
        <Popover
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false, anchorEl: null });
          }}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          {this.state.userInfo === null ? this.GuestPaper() : this.userPaper()}
        </Popover>
      </>
    );
  }
}

export default AuthModal;
