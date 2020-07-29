import React from 'react';
import ProfileListCardSP from '../page_sp/object/ProfileListCardSP';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { push } from 'connected-react-router';
import { getTimeLine, Profile } from '../modules/models/Profile';
import { Modal, Fade, Checkbox, FormControlLabel } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import ProfileModal from '../page_sp/object/ProfileModalSP';
import classes from '../scss/page_sp/timeLineSP.module.scss';

type TimeLineProps = {
  user: User | null;
  gotoChatroom: (roomId: string) => void;
};
type TimeLineState = {
  profileList: Profile[];
  showProfile: Profile | null;
  isMe: boolean;
};

class TimeLineSP extends React.Component<TimeLineProps, TimeLineState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      profileList: [],
      showProfile: null,
      isMe: false,
    };
  }

  setTimeLine() {
    getTimeLine({
      filter: {
        userId: this.state.isMe ? this.props.user?.uid : undefined,
      },
      limit: 30,
    }).then((data) => {
      this.setState({
        profileList: data,
      });
    });
  }
  componentDidMount() {
    this.setTimeLine();
  }

  render() {
    const { showProfile, isMe } = this.state;
    return (
      <>
        <FormControlLabel
          control={
            <Checkbox
              checked={isMe}
              onChange={() => {
                this.setState({ isMe: !isMe }, this.setTimeLine);
              }}
            />
          }
          label="自分の投稿を表示"
          className={classes.checkBox}
        />

        {/* 検索ボックスをコメントアウト */}
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            className={classes.inputInput}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div> */}

        {this.state.profileList.map((profile, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                this.setState({ showProfile: profile });
              }}
            >
              <ProfileListCardSP {...profile} loginUserUid={this.props.user?.uid} />
            </div>
          );
        })}
        <Modal
          disableAutoFocus
          open={showProfile != null}
          onClose={() => {
            this.setState({ showProfile: null });
          }}
        >
          <Fade in={showProfile != null}>
            {showProfile ? (
              <ProfileModal
                profile={showProfile}
                loginUserUid={this.props.user?.uid}
                onCreateChatroom={(chatRoomId) => {
                  console.log('chatRoom', chatRoomId);
                  if (chatRoomId) {
                    this.props.gotoChatroom(chatRoomId);
                  }
                }}
              />
            ) : (
              <div></div>
            )}
          </Fade>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    user: state.firebase.user,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    gotoChatroom: (roomId: string) => {
      dispatch(push(`/mailbox/${roomId}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineSP);
