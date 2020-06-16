import React, { Component } from 'react';
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
import classes from '../scss/page_sp/makeCharacterSP.module.scss';
import { createProfile } from '../modules/models/Profile';

interface Character {
  sex: 'man' | 'woman';
  icon: string;
  image: string;
}

const characterList: Array<Character> = [
  { sex: 'woman', icon: '/images/josei_01_a.png', image: '/images/josei_01_b.png' },
  { sex: 'woman', icon: '/images/josei_02_a.png', image: '/images/josei_02_b.png' },
  { sex: 'woman', icon: '/images/josei_03_a.png', image: '/images/josei_03_b.png' },
  { sex: 'woman', icon: '/images/josei_04_a.png', image: '/images/josei_04_b.png' },
  { sex: 'woman', icon: '/images/josei_05_a.png', image: '/images/josei_05_b.png' },
  { sex: 'woman', icon: '/images/josei_06_a.png', image: '/images/josei_06_b.png' },
  { sex: 'woman', icon: '/images/josei_07_a.png', image: '/images/josei_07_b.png' },
  { sex: 'woman', icon: '/images/josei_08_a.png', image: '/images/josei_08_b.png' },
  { sex: 'woman', icon: '/images/josei_09_a.png', image: '/images/josei_09_b.png' },
  { sex: 'woman', icon: '/images/josei_10_a.png', image: '/images/josei_10_b.png' },
  { sex: 'woman', icon: '/images/josei_11_a.png', image: '/images/josei_11_b.png' },
  { sex: 'woman', icon: '/images/josei_12_a.png', image: '/images/josei_12_b.png' },
  { sex: 'woman', icon: '/images/josei_13_a.png', image: '/images/josei_13_b.png' },
  { sex: 'woman', icon: '/images/josei_14_a.png', image: '/images/josei_14_b.png' },
  { sex: 'woman', icon: '/images/josei_15_a.png', image: '/images/josei_15_b.png' },
  { sex: 'woman', icon: '/images/josei_16_a.png', image: '/images/josei_16_b.png' },
  { sex: 'man', icon: '/images/dansei_01_a.png', image: '/images/dansei_01_b.png' },
  { sex: 'man', icon: '/images/dansei_02_a.png', image: '/images/dansei_02_b.png' },
  { sex: 'man', icon: '/images/dansei_03_a.png', image: '/images/dansei_03_b.png' },
  { sex: 'man', icon: '/images/dansei_04_a.png', image: '/images/dansei_04_b.png' },
  { sex: 'man', icon: '/images/dansei_05_a.png', image: '/images/dansei_05_b.png' },
  { sex: 'man', icon: '/images/dansei_06_a.png', image: '/images/dansei_06_b.png' },
  { sex: 'man', icon: '/images/dansei_07_a.png', image: '/images/dansei_07_b.png' },
  { sex: 'man', icon: '/images/dansei_08_a.png', image: '/images/dansei_08_b.png' },
  { sex: 'man', icon: '/images/dansei_09_a.png', image: '/images/dansei_09_b.png' },
  { sex: 'man', icon: '/images/dansei_10_a.png', image: '/images/dansei_10_b.png' },
  { sex: 'man', icon: '/images/dansei_11_a.png', image: '/images/dansei_11_b.png' },
  { sex: 'man', icon: '/images/dansei_12_a.png', image: '/images/dansei_12_b.png' },
  { sex: 'man', icon: '/images/dansei_13_a.png', image: '/images/dansei_13_b.png' },
  { sex: 'man', icon: '/images/dansei_14_a.png', image: '/images/dansei_14_b.png' },
];

type MakeCharacterProps = {};
type MakeCharacterStates = {
  selected: Character;
  name: string;
  sex: 'man' | 'woman';
  simpleProfile: string;
  profile: string;
};

export default class MakeCharacterSP extends Component<MakeCharacterProps, MakeCharacterStates> {
  constructor(props: MakeCharacterProps) {
    super(props);
    this.state = {
      selected: characterList[0],
      name: '',
      sex: characterList[0].sex,
      simpleProfile: '',
      profile: '',
    };
  }
  setIcon(character: Character) {
    this.setState({
      selected: character,
      sex: character.sex,
    });
  }

  render() {
    const selected = this.state.selected;
    return (
      <Grid>
        <Grid container item xs={12} sm={6} md={6} className={classes.main}>
          <Grid item xs={2} className={classes.content}>
            {characterList
              .filter((v) => v.sex === 'man')
              .map((v) => {
                return (
                  <Paper
                    className={classes.image_icon_wrap}
                    onClick={() => this.setIcon(v)}
                    elevation={v === selected ? 4 : 1}
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
              .filter((v) => v.sex === 'woman')
              .map((v) => {
                return (
                  <Paper
                    className={classes.image_icon_wrap}
                    onClick={() => this.setIcon(v)}
                    elevation={v === selected ? 4 : 1}
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
            <h2 className={classes.title}>キャラクター情報</h2>
          </Grid>
          <Grid item container>
            <Grid item>
              <TextField
                id="name"
                label="名前"
                variant="outlined"
                className={classes.textfield}
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.textfield}>
                <InputLabel id="sex">性別</InputLabel>
                <Select
                  labelId="sex"
                  id="sex"
                  value={this.state.sex}
                  onChange={(e) => {
                    this.setState({ sex: e.target.value as 'man' | 'woman' });
                  }}
                  label="性別"
                >
                  <MenuItem value={'man'}>男</MenuItem>
                  <MenuItem value={'woman'}>女</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="simpleProfile"
              label="ひとこと"
              variant="outlined"
              className={classes.textfield}
              value={this.state.simpleProfile}
              onChange={(e) => {
                this.setState({ simpleProfile: e.target.value });
              }}
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
              value={this.state.profile}
              onChange={(e) => {
                this.setState({ profile: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              className={classes.textfield}
              onClick={() => {
                createProfile({
                  name: this.state.name,
                  sex: this.state.sex,
                  icon: this.state.selected.image,
                  miniIcon: this.state.selected.icon,
                  profile: this.state.profile,
                  simpleProf: this.state.simpleProfile,
                }).then(() => {
                  window.location.href = '/timeline';
                });
              }}
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
