import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import classes from '../scss/page/top.module.scss';
import ContactMail from '../object/ContactMail';
import Footer from '../object/Footer';
type TopProps = {};

const howToPlay = [
  {
    title: 'トークの相手を探そう',
    image: '../images/explanation_01.png',
    text: `タイムラインにトークを待っている人がいるよ\n気になる人を見つけてチャットを開始しよう`,
  },
  {
    title: 'トークの相手を募集しよう',
    image: '../images/explanation_02.png',
    text: `キャラクター作成から自分のプロフィールを作成してタイムラインに載せることができるよ\nタイムラインに気になる人がいなかったら試してみてね`,
  },
  {
    title: 'トークルームで会話を楽しもう',
    image: '../images/explanation_03.png',
    text: `チャットを開始するとトークルームに相手の名前が出てくるよ`,
  },
];

const QA = [
  {
    title: '他の端末でも使用することができる？',
    text: `他の端末からもログインすることができるよ\nメール連携からログインの設定をすることができるよ`,
  },
  {
    title: 'キャラクターは複数作成することはできる？',
    text: `複数作成することはできるよ\n自分の作ったキャラは一覧から見ることができるよ`,
  },
];

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
          <div className={classes.minText}>使用している画像:わたおきば(https://wataokiba.net/)</div>
          <Typography component="h3" variant="h3" className={classes.contents__head}>
            遊び方
          </Typography>
          <Grid container justify="center">
            <Grid item xs={10}>
              {howToPlay.map((item) => (
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.card__head}
                    avatar={
                      <Typography component="h5" variant="h5">
                        {item.title}
                      </Typography>
                    }
                  />
                  <div className={classes.card__imageBox}>
                    <img
                      src={item.image}
                      className={classes.card__image}
                      alt="タイムラインを選んで、トークしたい人を選んでください"
                    />
                  </div>
                  <CardContent className={classes.card__contents}>
                    <Typography className={classes.card__contentsText} component="h6" variant="h6">
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.contentsWhite}>
          <Typography component="h3" variant="h3" className={classes.contents__head}>
            Q&A
          </Typography>
          <Grid container justify="center">
            <Grid item xs={10}>
              {QA.map((item) => (
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.card__head}
                    avatar={
                      <Typography component="h5" variant="h5">
                        {item.title}
                      </Typography>
                    }
                  />
                  <CardContent className={classes.card__contents}>
                    <Typography className={classes.card__contentsText} component="h6" variant="h6">
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>

          <Grid className={classes.contents}>
            <Typography component="h3" variant="h3" className={classes.contents__head}>
              お問い合わせ
            </Typography>
            <Grid container justify="center">
              <Grid item xs={10}>
                <ContactMail />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  }
}
