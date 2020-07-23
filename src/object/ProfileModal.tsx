import React, { Component } from 'react';
import {
  Paper,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { RootStateProps } from '../../src/redux/reducers';
import classes from '../scss/object/profileModal.module.scss';
import { Profile } from '../modules/models/Profile';
import { createChatRoom } from '../modules/models/Chatroom';
import { getCurrentUser } from '../modules/firebase';
import { characterList } from '../modules/models/Character';

type ProfileModalProps = {
  profile: Profile;
  loginUserUid?: string;
  pathname: string;
  onCreateChatroom: (roomId: string) => void;
};
type ProfileModalStates = {
  name: string;
  sex: 'man' | 'woman';
  profile: Profile;
  icon: string;
  minIcon: string;
  showIconArea: boolean;
};

class ProfileModal extends Component<ProfileModalProps, ProfileModalStates> {
  constructor(props: ProfileModalProps) {
    super(props);
    this.state = {
      profile: props.profile,
      sex: 'man',
      name: '',
      icon: characterList[0].image,
      minIcon: characterList[0].icon,
      showIconArea: false,
    };
    this.createChatroom = this.createChatroom.bind(this);
  }

  async createChatroom() {
    const ownerUid = this.state.profile.author;
    const playerInfo = await getCurrentUser();
    const profileId = this.state.profile.profileId;
    if (!playerInfo || !ownerUid || !profileId) throw new Error();
    const playerUid = playerInfo.uid;
    return await createChatRoom({
      profileId: profileId,
      joinUsers: [ownerUid, playerUid],
      ownerUid,
      playerUid,
      lastUpdateUser: playerUid,
      ownerInfo: this.state.profile,
      playerInfo: {
        name: this.state.name,
        sex: this.state.sex,
        icon: this.state.icon,
        miniIcon: this.state.minIcon,
        profile: '',
        simpleProf: '',
        author: playerUid,
      },
    });
  }

  render() {
    const prof = this.state.profile;
    return (
      <Paper className={classes.modal}>
        <Box className={classes.imageWrapper}>
          <img className={classes.image} src={prof.icon} alt="" />
        </Box>
        <Box className={classes.contents}>
          <p className={classes.name}>{prof.name}</p>
          <p className={classes.profile}>{prof.profile}</p>
          {this.props.loginUserUid !== prof.author && this.props.pathname === '/timeline' ? (
            <>
              <Box display="flex" className={classes.inputWrapper}>
                <TextField
                  id="name"
                  label="名前"
                  variant="outlined"
                  className={classes.textfield}
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                ></TextField>
                <FormControl variant="outlined" className={classes.textfield}>
                  <InputLabel id="sex">性別</InputLabel>
                  <Select
                    labelId="sex"
                    id="sex"
                    value={this.state.sex}
                    onChange={(e) => {
                      this.setState({ sex: e.target.value as 'man' | 'woman' });
                    }}
                    label="性別"
                  >
                    <MenuItem value={'man'}>男</MenuItem>
                    <MenuItem value={'woman'}>女</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  style={{ marginLeft: 'auto' }}
                  color="secondary"
                  variant="outlined"
                  onClick={async () => {
                    const chatRoom = await this.createChatroom();
                    this.props.onCreateChatroom(chatRoom);
                  }}
                >
                  チャット開始
                </Button>
              </Box>

              <p>アイコンを選ぶ</p>
              <Grid item xs={2} className={classes.icon_content}>
                <Paper
                  className={classes.image_icon_wrap}
                  elevation={this.state.showIconArea ? 4 : 1}
                >
                  <img
                    className={classes.image_icon}
                    src={this.state.minIcon}
                    alt=""
                    onClick={() => {
                      this.setState({
                        showIconArea: !this.state.showIconArea,
                      });
                    }}
                  />
                </Paper>
              </Grid>

              {this.state.showIconArea ? (
                <Grid container direction="row" justify="center" alignItems="center">
                  {characterList.map((v) => {
                    return (
                      <Grid item xs={2} className={classes.icon_content}>
                        <Paper
                          className={classes.image_icon_wrap}
                          elevation={v.icon === this.state.minIcon ? 4 : 1}
                        >
                          <img
                            className={classes.image_icon}
                            src={v.icon}
                            alt=""
                            onClick={() => {
                              this.setState({
                                icon: v.image,
                                minIcon: v.icon,
                                showIconArea: false,
                              });
                            }}
                          />
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : null}
            </>
          ) : null}
        </Box>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootStateProps) => ({
  pathname: state.router.location.pathname,
});
const mapDispatchToProps = (dispatch: Function) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
