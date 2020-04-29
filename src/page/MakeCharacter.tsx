import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      height: 'calc(100vh - 64px)',
    },
    content: {
      height: '100%',
      overflow: 'scroll',
    },
    textfield: {
      margin: 10,
      width: 'calc(100% - 20px)',
      '& textarea': {
        resize: 'vertical',
      },
    },
    image: {
      height: '100%',
      maxWidth: '100%',
      margin: 'auto',
    },
    image_icon_wrap: {
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
    },
    image_icon: {
      width: '100%',
    },
  })
);
interface Character {
  sex: number;
  icon: string;
  image: string;
}
interface Profile {
  name: String;
  sex: number;
  character: Character;
  profile: String;
  simpleProf: String;
}

const characterList: Array<Character> = [
  { sex: 2, icon: '/images/josei_01_a.png', image: '/images/josei_01_b.png' },
  { sex: 2, icon: '/images/josei_02_a.png', image: '/images/josei_02_b.png' },
  { sex: 2, icon: '/images/josei_03_a.png', image: '/images/josei_03_b.png' },
  { sex: 2, icon: '/images/josei_04_a.png', image: '/images/josei_04_b.png' },
  { sex: 2, icon: '/images/josei_05_a.png', image: '/images/josei_05_b.png' },
  { sex: 2, icon: '/images/josei_06_a.png', image: '/images/josei_06_b.png' },
  { sex: 2, icon: '/images/josei_07_a.png', image: '/images/josei_07_b.png' },
  { sex: 2, icon: '/images/josei_08_a.png', image: '/images/josei_08_b.png' },
  { sex: 2, icon: '/images/josei_09_a.png', image: '/images/josei_09_b.png' },
  { sex: 2, icon: '/images/josei_10_a.png', image: '/images/josei_10_b.png' },
  { sex: 2, icon: '/images/josei_11_a.png', image: '/images/josei_11_b.png' },
  { sex: 2, icon: '/images/josei_12_a.png', image: '/images/josei_12_b.png' },
  { sex: 2, icon: '/images/josei_13_a.png', image: '/images/josei_13_b.png' },
  { sex: 2, icon: '/images/josei_14_a.png', image: '/images/josei_14_b.png' },
  { sex: 2, icon: '/images/josei_15_a.png', image: '/images/josei_15_b.png' },
  { sex: 2, icon: '/images/josei_16_a.png', image: '/images/josei_16_b.png' },
  { sex: 1, icon: '/images/dansei_01_a.png', image: '/images/dansei_01_b.png' },
  { sex: 1, icon: '/images/dansei_02_a.png', image: '/images/dansei_02_b.png' },
  { sex: 1, icon: '/images/dansei_03_a.png', image: '/images/dansei_03_b.png' },
  { sex: 1, icon: '/images/dansei_04_a.png', image: '/images/dansei_04_b.png' },
  { sex: 1, icon: '/images/dansei_05_a.png', image: '/images/dansei_05_b.png' },
  { sex: 1, icon: '/images/dansei_06_a.png', image: '/images/dansei_06_b.png' },
  { sex: 1, icon: '/images/dansei_07_a.png', image: '/images/dansei_07_b.png' },
  { sex: 1, icon: '/images/dansei_08_a.png', image: '/images/dansei_08_b.png' },
  { sex: 1, icon: '/images/dansei_09_a.png', image: '/images/dansei_09_b.png' },
  { sex: 1, icon: '/images/dansei_10_a.png', image: '/images/dansei_10_b.png' },
  { sex: 1, icon: '/images/dansei_11_a.png', image: '/images/dansei_11_b.png' },
  { sex: 1, icon: '/images/dansei_12_a.png', image: '/images/dansei_12_b.png' },
  { sex: 1, icon: '/images/dansei_13_a.png', image: '/images/dansei_13_b.png' },
  { sex: 1, icon: '/images/dansei_14_a.png', image: '/images/dansei_14_b.png' },
];
function MakeCharacter() {
  const classes = useStyles();
  const [selected, setIcon] = useState(characterList[0]);
  const [profile, setProfile] = useState();

  return (
    <Grid container className={classes.main}>
      <Grid container item xs={12} sm={6} md={6} className={classes.main}>
        <Grid item xs={2} className={classes.content}>
          {characterList
            .filter((v) => v.sex == 1)
            .map((v) => {
              return (
                <Paper
                  className={classes.image_icon_wrap}
                  onClick={() => setIcon(v)}
                  elevation={v == selected ? 4 : 1}
                >
                  <img className={classes.image_icon} src={v.icon} alt="" />
                </Paper>
              );
            })}
        </Grid>
        <Grid item xs={8} style={{ textAlign: 'center' }} className={classes.image}>
          <img className={classes.image} src={selected.image} alt="" />
        </Grid>
        <Grid item xs={2} className={classes.content}>
          {characterList
            .filter((v) => v.sex == 2)
            .map((v) => {
              return (
                <Paper
                  className={classes.image_icon_wrap}
                  onClick={() => setIcon(v)}
                  elevation={v == selected ? 4 : 1}
                >
                  <img className={classes.image_icon} src={v.icon} alt="" />
                </Paper>
              );
            })}
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        md={6}
        alignItems="stretch"
        direction="column"
        style={{ textAlign: 'center' }}
      >
        <Grid item container>
          <Grid item xs={10}>
            <TextField id="name" label="名前" variant="outlined" className={classes.textfield} />
          </Grid>
          <Grid item xs={2}>
            <FormControl variant="outlined" className={classes.textfield}>
              <InputLabel id="sex">性別</InputLabel>
              <Select labelId="sex" id="sex" value={1} onChange={() => {}} label="性別">
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={2}>女</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            id="simpleProf"
            label="ひとこと"
            variant="outlined"
            className={classes.textfield}
          />
        </Grid>
        <Grid item>
          <TextField
            id="profile"
            label="自己紹介"
            variant="outlined"
            className={classes.textfield}
            rows={4}
            multiline={true}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" className={classes.textfield}>
            登録
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MakeCharacter;
