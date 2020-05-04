import React from 'react';
import { Paper, Button, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import classes from './profileModal.module.scss';
import { Profile } from '../modules/models/Profile';

/**
 * ユーザープロフィールのモーダル
 * @param prof
 */

function ProfileModal(prof: Profile) {
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
          <Button style={{ marginLeft: 'auto' }} color="secondary" variant="outlined">
            チャット開始
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileModal;
