import React, { Component } from 'react';
import { Paper, Button, Box, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import classes from './profileModal.module.scss';
import { Profile } from '../modules/models/Profile';

type ProfileModalProps = {
  profile: Profile;
};
type ProfileModalStates = {
  name: string;
  profile: Profile;
};

export default class ProfileModal extends Component<ProfileModalProps, ProfileModalStates> {
  constructor(props: ProfileModalProps) {
    super(props);
    this.state = {
      profile: props.profile,
      name: '',
    };
  }
  render() {
    const prof = this.state.profile;
    return (
      <Paper className={classes.modal}>
        <CloseIcon className={classes.closeIcon} />
        <Box className={classes.imageWrapper}>
          <NavigateBefore className={classes.prevIcon} />
          <img className={classes.image} src={prof.icon} alt="" />
          <NavigateNext className={classes.nextIcon} />
        </Box>
        <Box className={classes.contents}>
          <p className={classes.name}>{prof.name}</p>
          <p className={classes.profile}>{prof.profile}</p>
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
            <Button style={{ marginLeft: 'auto' }} color="secondary" variant="outlined">
              チャット開始
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }
}
