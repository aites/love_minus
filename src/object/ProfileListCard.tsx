import React from 'react';
import { Paper, Typography, Grid, Button, Box } from '@material-ui/core';
import classes from './profileListCard.module.scss';

export interface ListProfileInterface {
  name: string;
  imageUrl: string;
  simpleProf: string; // ひとこと
  modalImage: string;
  profile: string;
}

function ProfileListCard(prof: ListProfileInterface) {
  return (
    <Paper style={{ margin: 10 }}>
      <Box display="flex">
        <Box>
          <img className={classes.image} src={prof.imageUrl} alt="" />
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
