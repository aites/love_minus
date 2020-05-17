import React from 'react';
import { Modal, Fade } from '@material-ui/core';
import ProfileListCard from '../object/ProfileListCard';
import ProfileModal from '../object/ProfileModal';
//import classes from './timeLine.module.scss';
import { getTimeLine, Profile } from '../modules/models/Profile';

type TimeLineProps = {};
type TimeLineState = {
  profileList: Profile[];
  showProfile: Profile | null;
};

export default class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      profileList: [],
      showProfile: null,
    };
  }
  componentDidMount() {
    getTimeLine({
      limit: 30,
    }).then((data) => {
      this.setState({
        profileList: data,
      });
    });
  }

  render() {
    const showProfile = this.state.showProfile;
    return (
      <>
        {this.state.profileList.map((profile, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                this.setState({ showProfile: profile });
              }}
            >
              <ProfileListCard {...profile} />
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
            {showProfile ? <ProfileModal profile={showProfile} /> : <div></div>}
          </Fade>
        </Modal>
      </>
    );
  }
}
