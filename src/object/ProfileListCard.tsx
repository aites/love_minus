import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@material-ui/core';
import classes from './profileListCard.module.scss';
import { Profile } from '../modules/models/Profile';

function ProfileListCard(prof: Profile) {
  return (
    <Paper style={{ margin: 10 }}>
      <Box display="flex">
        <Box>
          <img className={classes.image} src={prof.miniIcon} alt="" />
        </Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="subtitle1">
            {prof.name}(10分前)
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            <p>{prof.simpleProf}</p>
          </Typography>
        </Box>
        <Box>
          <Button style={{ margin: 10 }} color="secondary" variant="outlined">
            チャット開始
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileListCard;
