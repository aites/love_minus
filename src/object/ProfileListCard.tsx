import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 100,
      height: 100,
    },
  }),
);

export interface ListProfileInterface{
  name: string,
  imageUrl: string,
  simpleProf: string, // ひとこと
}

function ProfileListCard(prof: ListProfileInterface) {
  const classes = useStyles();
  return (
    <Paper style={{margin:10}}>
      <Box display="flex">
        <Box><img className={classes.image} alt="complex" src={prof.imageUrl}/></Box>
        <Box flexGrow={1}>
          <Typography gutterBottom variant="subtitle1">
            {prof.name}
          </Typography>    
          <Typography gutterBottom variant="subtitle1">
            <p>{prof.simpleProf}</p>
          </Typography>    
        </Box>
        <Box>
          <Button style={{margin:10}} color="secondary" variant="outlined" >チャット開始</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProfileListCard;
