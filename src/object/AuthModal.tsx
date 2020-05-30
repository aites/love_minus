import React, { Component } from 'react';
import firebase, { getCurrentUser } from '../modules/firebase';
import { Paper, Button, Popover, TextField, Box, Grid } from '@material-ui/core';
import HelpOutline from '@material-ui/icons/HelpOutline';
import classes from '../scss/object/authModal.module.scss';
import Validation from '../modules/formValidation';
import { connect } from 'react-redux';
import { RootStateProps } from '../redux/reducers';
import { AppStateProps } from '../redux/reducers/firebaseReducer';

type AuthModalProps = {
  firebase: AppStateProps;
};
type AuthModalStates = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  email: string;
  isLoading: boolean;
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
      isLoading: true,
      anchorEl: null,
      email: '',
      userInfo: null,
      validation01: '',
      validation02: '',
    };
  }
  componentDidUpdate(prevProps: AuthModalProps) {
    if (prevProps.firebase !== this.props.firebase) {
      if (this.props.firebase.user) {
        this.setState({
          isLoading: false,
          userInfo: {
            uid: this.props.firebase.user.uid,
            email: this.props.firebase.user.email || '',
            isAnonymous: this.props.firebase.user.isAnonymous,
          },
        });
      }
    }
  }

  async componentDidMount() {
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
    } else {
      // メールリンクではない場合
      let currentUser = await getCurrentUser();
      if (!currentUser) {
        // ログインしていない場合
        await firebase.auth().signInAnonymously();
      }
    }
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
    firebase
      .auth()
      .signOut()
      .then(() => {
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
          {this.InfoContents()}
        </Grid>
      </Paper>
    );
  };

  GuestPaper = () => {
    return (
      <Grid item xs={12}>
        <h2 className={classes.modal__head}>新規登録/ログイン</h2>
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
            メールアドレス宛に1回限り使えるログイン用の認証リンクを送ります。
            そちらのリンクをクリックすることでメールアドレス連携完了となります。
            完了すると次回以降ログインすることができます。
          </span>
        </Box>
      </Grid>
    );
  };

  userPaper = () => {
    return (
      <Paper className={classes.modal}>
        <Grid container direction="column" justify="center" spacing={2}>
          <p>Email:{this.state.userInfo?.email}</p>
        </Grid>
      </Paper>
    );
  };

  render() {
    const isLogin = !!this.state.userInfo && !this.state.userInfo.isAnonymous;
    return (
      <>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            this.setState({ open: true, anchorEl: e.currentTarget });
          }}
          className={classes.link}
        >
          {this.state.isLoading ? '' : isLogin ? 'マイページ' : 'ログイン/メール連携'}
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

function mapStateToProps(state: RootStateProps) {
  return {
    firebase: state.firebase,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
