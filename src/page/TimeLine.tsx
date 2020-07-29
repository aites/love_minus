import React from 'react';
import {
  Modal,
  Fade,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import ProfileListCard from '../object/ProfileListCard';
import ProfileModal from '../object/ProfileModal';
import classes from '../scss/page/timeLine.module.scss';
import { getTimeLine, Profile } from '../modules/models/Profile';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { push } from 'connected-react-router';
import SearchIcon from '@material-ui/icons/Search';

type TimeLineProps = {
  user: User | null;
  gotoChatroom: (roomId: string) => void;
};
type SexFilterType = 'man' | 'woman' | '';
type TimeLineState = {
  profileList: Profile[];
  showProfile: Profile | null;
  isSearchOpen: boolean;
  isMe: boolean;
  sex: SexFilterType;
};

class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      profileList: [],
      showProfile: null,
      isSearchOpen: false,
      isMe: false,
      sex: '',
    };
  }

  setTimeLine() {
    getTimeLine({
      filter: {
        userId: this.state.isMe ? this.props.user?.uid : undefined,
        sex: this.state.sex,
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
    const { showProfile, isSearchOpen, isMe, sex } = this.state;
    return (
      <>
        <IconButton
          style={{ left: 0 }}
          onClick={() => {
            this.setState({ isSearchOpen: !isSearchOpen });
          }}
        >
          <SearchIcon />
          検索
        </IconButton>
        <div style={{ display: isSearchOpen ? 'none' : '' }}>
          <div>
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
          </div>
          <div>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel id="sex">性別</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={sex}
                displayEmpty
                onChange={(e) => {
                  this.setState({ sex: e.target.value as SexFilterType }, this.setTimeLine);
                }}
                label="性別"
              >
                <MenuItem value={''}>性別</MenuItem>
                <MenuItem value={'man'}>男</MenuItem>
                <MenuItem value={'woman'}>女</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
