import React, { Component } from 'react';
import firebase, { resetCurrentUser } from '../modules/firebase';
import { Paper, Button, Popover, TextField, InputLabel, Box, Grid } from '@material-ui/core';
import HelpOutline from '@material-ui/icons/HelpOutline';
import classes from './authModal.module.scss';
import Validation from '../modules/models/formValidation';

type AuthModalProps = {};
type AuthModalStates = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  email: string;
  userInfo: UserInfo | null;
  validation01: string;
  validation02: string;
};
type UserInfo = {
  uid: string;
  email: string;
  isAnonymous: boolean;
};

class AuthModal extends Component<AuthModalProps, AuthModalStates> {
  constructor(props: AuthModalProps) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      email: '',
      userInfo: null,
      validation01: '',
      validation02: '',
    };
  }

  async componentDidMount() {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase.auth().signInAnonymously();

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // メールリンクのURLからきた場合
      let email = window.localStorage.getItem('emailForSignIn');
      while (!email) {
        // 保存されたメアドが見つからなかったので入力を求める
        email = window.prompt('Please provide your email for confirmation');
      }
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
          email,
          window.location.href
        );
        try {
          // 匿名ユーザーにメールアドレスを紐づける
          await currentUser.linkWithCredential(credential);
        } catch (e) {
          switch (e.code) {
            // すでに登録済みアドレスの場合, ログインする
            case 'auth/email-already-in-use':
              await firebase.auth().signInWithEmailLink(email, window.location.href);
              break;
          }
        }
      } else {
        await firebase.auth().signInWithEmailLink(email, window.location.href);
      }
    }
    firebase.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged', user);
      if (user != null) {
        this.setState({
          userInfo: {
            uid: user.uid,
            email: user.email || '',
            isAnonymous: user.isAnonymous,
          },
        });
      } else {
        resetCurrentUser();
        this.setState({
          userInfo: null,
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
  logout() {
    console.log('logout click');
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logouted');
        resetCurrentUser();
        this.setState({ userInfo: null });
      });
  }

  formValidation = (e: React.ChangeEvent<HTMLInputElement>, stateKey: string) => {
    const key = e.target.name;
    const value = e.target.value;
    const message = String(Validation.formValidate(key, value));

    if (stateKey === 'validation01') {
      this.setState({
        validation01: message,
      });
    } else if (stateKey === 'validation02') {
      this.setState({
        validation02: message,
      });
    }
  };

  ModalPaper = () => {
    return (
      <Paper className={classes.modal}>
        <Grid container direction="column" justify="center" spacing={2}>
          {this.GuestPaper()}
          {this.LoginPaper()}
          {this.InfoContents()}
        </Grid>
      </Paper>
    );
  };

  GuestPaper = () => {
    return (
      <Grid item xs={12}>
        <h2 className={classes.modal__head}>新規登録</h2>
        <TextField
          id="name"
          label="メールアドレス"
          variant="outlined"
          type="email"
          name="email"
          className={classes.modal__inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ email: e.target.value });
            this.formValidation(e, 'validation01');
          }}
        />
        <p className={classes.errorMessage}>{this.state.validation01}</p>
        <Button
          variant="outlined"
          color="primary"
          className={classes.modal__button}
          onClick={() => {
            this.login(this.state.email);
          }}
        >
          登録
        </Button>
      </Grid>
    );
  };

  LoginPaper = () => {
    return (
      <Grid item xs={12}>
        <h2 className={classes.modal__head}>ログイン</h2>
        <TextField
          id="name"
          label="メールアドレス"
          variant="outlined"
          type="email"
          name="email"
          className={classes.modal__inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ email: e.target.value });
            this.formValidation(e, 'validation02');
          }}
        />
        <p className={classes.errorMessage}>{this.state.validation02}</p>
        <Button
          variant="outlined"
          color="primary"
          className={classes.modal__button}
          onClick={() => {
            this.login(this.state.email);
          }}
        >
          ログイン
        </Button>
      </Grid>
    );
  };

  InfoContents = () => {
    return (
      <Grid item xs={12}>
        <Box className={classes.modal__infoBox}>
          <HelpOutline className={classes.modal__infoIcon}></HelpOutline>
          <span className={classes.modal__infoText}>
            メールアドレス宛に1回限り使えるログイン用の認証リンクを送ります。そちらのリンクをクリックすることでログインとなります。
          </span>
        </Box>
      </Grid>
    );
  };

  userPaper = () => {
    return (
      <Paper className={classes.modal}>
        <Grid container direction="column" justify="center" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.modal__button}
            onClick={() => {
              this.logout();
            }}
          >
            ログアウト
          </Button>
        </Grid>
      </Paper>
    );
  };

  render() {
    const isLogin = !!this.state.userInfo;
    return (
      <>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            this.setState({ open: true, anchorEl: e.currentTarget });
          }}
          className={classes.link}
        >
          {isLogin ? 'ログアウト' : 'ログイン/アカウント登録'}
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
          {isLogin ? this.userPaper() : this.ModalPaper()}
        </Popover>
      </>
    );
  }
}

export default AuthModal;
