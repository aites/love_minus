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
import classes from '../../scss/page/makeCharacter.module.scss';
import { createProfile } from '../../modules/models/Profile';
import { characterList } from '../../modules/models/Character';
import { MakeCharacterComponentProps } from './index';

interface Character {
  sex: 'man' | 'woman';
  icon: string;
  image: string;
}

export default class MakeCharacter extends Component<MakeCharacterComponentProps> {
  render() {
    const selected = this.props.selectedCharacter;
    return (
      <Grid container className={classes.main}>
        <Grid container item xs={12} sm={6} md={6} className={classes.main}>
          <Grid item xs={2} className={classes.content}>
            {characterList
              .filter((v) => v.sex === 'man')
              .map((v) => {
                return (
                  <Paper
                    className={classes.image_icon_wrap}
                    onClick={() => this.props.selectCharacter(v)}
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
                    onClick={() => this.props.selectCharacter(v)}
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
            <Grid item xs={10}>
              <TextField
                id="name"
                label="名前"
                variant="outlined"
                className={classes.textfield}
                value={this.props.name}
                onChange={(e) => {
                  this.props.inputData({ name: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" className={classes.textfield}>
                <InputLabel id="sex">性別</InputLabel>
                <Select
                  labelId="sex"
                  id="sex"
                  value={this.props.sex}
                  onChange={(e) => {
                    this.props.inputData({ sex: e.target.value as 'man' | 'woman' });
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
              value={this.props.simpleProfile}
              onChange={(e) => {
                this.props.inputData({ simpleProfile: e.target.value });
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
              value={this.props.profile}
              onChange={(e) => {
                this.props.inputData({ profile: e.target.value });
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
                  name: this.props.name,
                  sex: this.props.sex,
                  icon: this.props.selectedCharacter.image,
                  miniIcon: this.props.selectedCharacter.icon,
                  profile: this.props.profile,
                  simpleProf: this.props.simpleProfile,
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
