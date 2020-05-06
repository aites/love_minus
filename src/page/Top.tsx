import React from 'react';
import { Grid } from '@material-ui/core';
import classes from './top.module.scss';

type TopProps = {};

export default class Top extends React.Component<TopProps> {
  render() {
    return (
      <Grid>
        <img
          className={classes.mainView}
          src="../images/love_minus_mainView.png"
          alt="メイン画像"
        />
      </Grid>
    );
  }
}
