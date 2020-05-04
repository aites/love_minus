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
  sex: number;
  profile: Profile;
};

export default class ProfileModal extends Component<ProfileModalProps, ProfileModalStates> {
  constructor(props: ProfileModalProps) {
    super(props);
    this.state = {
      profile: props.profile,
      sex: 1,
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
            <FormControl variant="outlined" className={classes.textfield}>
              <InputLabel id="sex">性別</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={this.state.sex}
                onChange={(e) => {
                  this.setState({ sex: Number(e.target.value) });
                }}
                label="性別"
              >
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={2}>女</MenuItem>
              </Select>
            </FormControl>
            <Button style={{ marginLeft: 'auto' }} color="secondary" variant="outlined">
              チャット開始
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }
}
