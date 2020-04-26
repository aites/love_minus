import React from 'react';
import {TextField, Grid, Button} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      margin: 10,
      width: "calc(100% - 20px)",
      maxWidth: 400,
    },
    image: {
      width:"50%",
    },
  })
);


function MakeCharacter(){
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={6} >
        <img className={classes.image} src="/images/josei_07_b.png" alt="" />
      </Grid>
      <Grid container item xs={12} sm={6} md={6} alignItems="stretch" direction="column" >
        <Grid item>
          <TextField id="name" label="名前" variant="outlined" className={classes.textfield} />
        </Grid>
        <Grid item>
          <TextField id="simpleProf" label="ひとこと" variant="outlined" className={classes.textfield} />
        </Grid>
        <Grid item>
          <TextField id="profile" label="自己紹介" variant="outlined" className={classes.textfield} rows={4} multiline={true} />
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" className={classes.textfield} >
            登録
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MakeCharacter;