import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@material-ui/core';
import classes from '../scss/page_sp/topSP.module.scss';
import ContactMail from '../object/ContactMail';
import Footer from '../object/Footer';
import { connect } from 'react-redux';
import { submitContactAction } from '../redux/actions/contactAction';
type TopProps = {
  sendContactMail: (mail: string, message: string) => void;
};

const howToPlay = [
  {
    title: 'トークの相手を探そう',
    image: '../images/explanationSP_01.png',
    text: `タイムラインにトークを待っている人がいるよ\n気になる人を見つけてチャットを開始しよう`,
  },
  {
    title: 'トークの相手を募集しよう',
    image: '../images/explanationSP_02.png',
    text: `キャラクター作成から自分のプロフィールを作成してタイムラインに載せることができるよ\nタイムラインに気になる人がいなかったら試してみてね`,
  },
  {
    title: 'トークルームで会話を楽しもう',
    image: '../images/explanationSP_03.png',
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
    text: `複数作成することはできるよ\n自分の作ったキャラはタイムラインから見ることができるよ`,
  },
];

function Top(props: TopProps) {
  return (
    <Grid>
      <Grid>
        <img
          className={classes.mainView}
          src="../images/love_minus_mainViewSP.png"
          alt="メイン画像"
        />
      </Grid>
      <Grid className={classes.contents}>
        <div className={classes.minText}>使用している画像:わたおきば(https://wataokiba.net/)</div>
        <Typography component="h4" variant="h4" className={classes.contents__head}>
          遊び方
        </Typography>
        <Grid container justify="center">
          <Grid item xs={10}>
            {howToPlay.map((item, i) => (
              <Card className={classes.card} key={i}>
                <CardHeader
                  className={classes.card__head}
                  title={<div className={classes.card__headText}>{item.title}</div>}
                />
                <div className={classes.card__imageBox}>
                  <img
                    src={item.image}
                    className={classes.card__image}
                    alt="タイムラインを選んで、トークしたい人を選んでください"
                  />
                </div>
                <CardContent className={classes.card__contents}>
                  <Typography className={classes.card__contentsText}>{item.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.contentsWhite}>
        <Typography component="h4" variant="h4" className={classes.contents__head}>
          Q&A
        </Typography>
        <Grid container justify="center">
          <Grid item xs={10}>
            {QA.map((item, i) => (
              <Card className={classes.card} key={i}>
                <CardHeader
                  className={classes.card__head}
                  title={<div className={classes.card__headText}>{item.title}</div>}
                />
                <CardContent className={classes.card__contents}>
                  <div className={classes.card__contentsText}>{item.text}</div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>

        <Grid className={classes.contents}>
          <Typography component="h4" variant="h4" className={classes.contents__head}>
            お問い合わせ
          </Typography>
          <Grid container justify="center">
            <Grid item xs={10}>
              <ContactMail sendContactMail={props.sendContactMail} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
}

function mapDispatchToProps(dispatch: Function) {
  return {
    sendContactMail: (mail: string, message: string) => {
      dispatch(submitContactAction(mail, message));
    },
  };
}

export default connect(null, mapDispatchToProps)(Top);
