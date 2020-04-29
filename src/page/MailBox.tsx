import React from 'react';
import { Theme, Grid, Divider, Badge, Typography } from '@material-ui/core';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      top: 12,
    },
  })
)(Badge);

const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 64px)',
  },
  content: {
    height: '100%',
    overflow: 'scroll',
  },
  mailListRow: {
    height: 100,
    paddingLeft: 10,
    paddingTop: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
});

function MailBox() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.main}>
      <Grid item xs={12} sm={4} md={3} className={classes.content}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 1, 9, 0].map((v, i) => {
          return (
            <>
              <Grid container wrap="nowrap" className={classes.mailListRow}>
                <Grid item>
                  <img className={classes.image} src="/images/atobe.jpg" />
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
      <Grid item xs={12} sm={8} md={9} className={classes.content}>
        <div style={{ height: '100%' }}></div>
      </Grid>
    </Grid>
  );
}
export default MailBox;
