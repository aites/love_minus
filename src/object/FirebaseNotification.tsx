import firebase, { db } from '../modules/firebase';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { RootStateProps } from '../redux/reducers';
import { CHANGE_USER, AppStateProps } from '../redux/reducers/firebaseReducer';
import { success } from 'react-notification-system-redux';
import { ChatRoom } from '../modules/models/Chatroom';

type Props = {
  authChanged: (user: User) => void;
  addChatRoom: (room: ChatRoom) => void;
  firebase: AppStateProps;
};

class FirebaseNotification extends Component<Props> {
  unscribes = {
    onAuthStateChanged: () => {},
    onUpdateTimeline: () => {},
  };
  componentDidMount() {
    // ログイン情報変更時
    this._onAuthStateChanged();
  }
  componentDidUpdate(nextProps: Props) {
    console.log('componentDidUpdate', nextProps, this.props);
    // UID発行後に監視する内容
    if (nextProps.firebase.user === null && this.props.firebase.user) {
      const currentUserUID = this.props.firebase.user.uid;
      // タイムラインを監視
      this._onUpdateTimeline(currentUserUID);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.unscribes.onAuthStateChanged();
    this.unscribes.onUpdateTimeline();
  }

  // ログイン情報を監視
  _onAuthStateChanged() {
    this.unscribes.onAuthStateChanged();
    this.unscribes.onAuthStateChanged = firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.props.authChanged(user);
      }
    });
  }

  // タイムラインを監視
  _onUpdateTimeline(currentUserUID: string) {
    this.unscribes.onUpdateTimeline();
    this.unscribes.onUpdateTimeline = db
      .collection('chatroom')
      .where('joinUsers', 'array-contains', currentUserUID)
      .where('updatedAt', '>', new Date())
      .orderBy('updatedAt', 'desc')
      .limit(1)
      .onSnapshot((snapShot) => {
        console.log('chatroom snapShot', snapShot);
        if (snapShot.metadata.hasPendingWrites === true) return;
        if (!snapShot.metadata.hasPendingWrites && !snapShot.empty) {
          const data = snapShot.docs[0].data() as ChatRoom;
          this.props.addChatRoom(data);
        }
      });
  }

  render() {
    return <></>;
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    firebase: state.firebase,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    authChanged(user: User) {
      dispatch({
        type: CHANGE_USER,
        user: user,
      });
      if (!user.isAnonymous) {
        dispatch(success({ title: 'ログインしました' }));
      }
    },
    addChatRoom(room: ChatRoom) {
      console.log('addChatRoom', room);
      dispatch(success({ title: 'チャットリクエストが届きました' }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseNotification);
