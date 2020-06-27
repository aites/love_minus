import React from 'react';
import { Paper, Typography, Box } from '@material-ui/core';
import classes from '../../scss/page_sp/object/profileListCardSP.module.scss';
import { Profile } from '../../modules/models/Profile';
import { timestampToString } from '../../modules/firebase';

function ProfileListCardSP(prof: Profile & { loginUserUid?: string }) {
  return (
    <Paper className={classes.paper}>
      <Box display="flex">
        <Box mr={1}>
          <img className={classes.image} src={prof.miniIcon} alt="" />
        </Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="subtitle1">
            {prof.name}
            {prof.author === prof.loginUserUid && (
              <span className={classes.ribbon}>自分のチャット</span>
            )}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            ({timestampToString(prof.createdAt)})
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            <p>{prof.simpleProf}</p>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileListCardSP;
