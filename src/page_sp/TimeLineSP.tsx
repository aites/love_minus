import React from 'react';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { User } from 'firebase';
import { getTimeLine, Profile } from '../modules/models/Profile';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

type TimeLineProps = {
  user: User | null;
};
type TimeLineState = {
  profileList: Profile[];
};

class TimeLineSP extends React.Component<TimeLineProps, TimeLineState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      profileList: [],
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
    const theme = createMuiTheme();

    let profileList = this.state.profileList.concat(this.state.profileList);
    profileList = profileList.concat(profileList);
    return (
      <>
        <List>
          {profileList.map((profile, i) => {
            return (
              <React.Fragment key={i}>
                <ListItem alignItems="flex-start" divider={true} style={{ paddingLeft: '8px' }}>
                  <ListItemAvatar style={{ margin: '0' }}>
                    <Avatar
                      alt="alt"
                      src={profile.miniIcon}
                      style={{ width: theme.spacing(7), height: theme.spacing(7) }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {profile.simpleProf}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
              //{JSON.stringify(profile)}
            );
          })}
        </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeLineSP);
