import React from 'react';
import { Modal, Fade, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import ProfileListCard from '../object/ProfileListCard';
import ProfileModal from '../object/ProfileModal';
//import classes from '../scss/timeLine.module.scss';
import { getTimeLine, Profile } from '../modules/models/Profile';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { User } from 'firebase';

type TimeLineProps = {
  user: User | null;
};
type TimeLineState = {
  profileList: Profile[];
  showProfile: Profile | null;
  isMe: boolean;
};

class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
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
          label="自分の投稿"
        />
        <TextField style={{ width: '100%' }} />
        {this.state.profileList.map((profile, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                this.setState({ showProfile: profile });
              }}
            >
              <ProfileListCard {...profile} loginUserUid={this.props.user?.uid} />
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
              <ProfileModal profile={showProfile} loginUserUid={this.props.user?.uid} />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
