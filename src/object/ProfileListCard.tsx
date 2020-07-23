import React from 'react';
import { Paper, Typography, Button, Box } from '@material-ui/core';
import classes from '../scss/object/profileListCard.module.scss';
import { Profile } from '../modules/models/Profile';
import { timestampToString } from '../modules/firebase';

function ProfileListCard(prof: Profile & { loginUserUid?: string }) {
  return (
    <Paper style={{ margin: 10 }}>
      <Box display="flex">
        <Box>
          <img className={classes.image} src={prof.miniIcon} alt="" />
        </Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="subtitle1">
            {prof.name}({timestampToString(prof.createdAt)})
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            <p>{prof.simpleProf}</p>
          </Typography>
        </Box>
        <Box>
          <Button style={{ margin: 10 }} color="secondary" variant="outlined">
            {prof.author === prof.loginUserUid ? '自分のチャット' : 'チャット開始'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileListCard;
