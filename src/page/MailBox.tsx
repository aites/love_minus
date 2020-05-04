import React from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import ChatRoom from './ChatRoom';
import classes from './mailBox.module.scss';

export default class MailBox extends React.Component {
  render() {
    return (
      <Grid container component="main" className={classes.main}>
        <Grid item xs={12} sm={4} md={3} className={classes.content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 1, 9, 0].map((v, i) => {
            return (
              <>
                <Grid container wrap="nowrap" className={classes.mailListRow}>
                  <Grid item>
                    <img className={classes.image} src="/images/atobe.jpg" alt="" />
                  </Grid>
                  <Grid item>
                    <Typography>西園寺 日向</Typography>
                    <Typography noWrap variant="caption">
                      もしもし〜
                    </Typography>
                  </Grid>
                </Grid>
                <Divider></Divider>
              </>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={8} md={9} className={classes.content} style={{ overflow: 'hidden' }}>
          <ChatRoom />
        </Grid>
      </Grid>
    );
  }
}
