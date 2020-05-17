import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import classes from './top.module.scss';

type TopProps = {};

export default class Top extends React.Component<TopProps> {
  render() {
    return (
      <Grid>
        <Grid>
          <img
            className={classes.mainView}
            src="../images/love_minus_mainView.png"
            alt="メイン画像"
          />
        </Grid>
        <Grid className={classes.contents}>
          <Typography component="h3" variant="h3" className={classes.contensts__head}>
            遊び方
          </Typography>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CardHeader
                  className={classes.card__head}
                  avatar={
                    <Typography component="h5" variant="h5">
                      トークをするには？
                    </Typography>
                  }
                />
                <div className={classes.card__imageBox}>
                  <img
                    src="../images/explanation_01.png"
                    className={classes.card__image}
                    alt="タイムラインを選んで、トークしたい人を選んでください"
                  />
                </div>
                <CardContent className={classes.card__contents}>
                  <Typography component="h6" variant="h6">
                    タイムラインを選んで、トークしたい人を探して、
                    トークしたい人を決めたら、「チャット開始」を押してください！!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
