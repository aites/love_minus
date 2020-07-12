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
} from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import classes from '../scss/object/profileModal.module.scss';
import { Profile } from '../modules/models/Profile';
import { createChatRoom } from '../modules/models/Chatroom';
import { getCurrentUser } from '../modules/firebase';

type ProfileModalProps = {
  profile: Profile;
  loginUserUid?: string;
  onCreateChatroom: (roomId: string) => void;
};
type ProfileModalStates = {
  name: string;
  sex: 'man' | 'woman';
  profile: Profile;
};

export default class ProfileModal extends Component<ProfileModalProps, ProfileModalStates> {
  constructor(props: ProfileModalProps) {
    super(props);
    this.state = {
      profile: props.profile,
      sex: 'man',
      name: '',
    };
    this.createChatroom = this.createChatroom.bind(this);
  }

  async createChatroom() {
    const ownerUid = this.state.profile.author;
    const playerInfo = await getCurrentUser();
    if (!playerInfo || !ownerUid) throw new Error();
    const playerUid = playerInfo.uid;
    return await createChatRoom({
      joinUsers: [ownerUid, playerUid],
      ownerUid,
      playerUid,
      lastUpdateUser: playerUid,
      ownerInfo: this.state.profile,
      playerInfo: {
        name: this.state.name,
        sex: this.state.sex,
        icon: '',
        miniIcon: '',
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
          <NavigateBefore className={classes.prevIcon} />
          <img className={classes.image} src={prof.icon} alt="" />
          <NavigateNext className={classes.nextIcon} />
        </Box>
        <Box className={classes.contents}>
          <p className={classes.name}>{prof.name}</p>
          <p className={classes.profile}>{prof.profile}</p>
          {this.props.loginUserUid !== prof.author ? (
            <Box display="flex">
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
          ) : null}
        </Box>
      </Paper>
    );
  }
}
