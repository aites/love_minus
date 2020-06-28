import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import TimeLine from './page/TimeLine';
import MailBox from './page/MailBox';
import MakeCharacter from './page/MakeCharacter';
import Top from './page/Top';
import MainAppBar from './object/MainAppBar';
import { connect } from 'react-redux';
import Notification from './object/Notification';
import FirebaseNotification from './object/FisebaseSnapshot/FirebaseNotification';
import { RootStateProps } from './redux/reducers';
import { setUserAgentAction } from './redux/actions/deviceAction';
import MainFooterBar from './page_sp/MainFooterBar';
import MainHeaderBar from './page_sp/object/MainHeaderBar';
// SP画面
import TopSP from './page_sp/TopSP';
import TimeLineSP from './page_sp/TimeLineSP';
import MailBoxSP from './page_sp/MailBox/MailBoxSP';
import MakeCharacterSP from './page_sp/MakeCharacterSP';

type Props = {
  device: string;
  setUserAgent: (ua: string) => void;
};
export class App extends React.Component<Props> {
  componentDidMount() {
    const ua = window.navigator.userAgent.toLowerCase();
    this.props.setUserAgent(ua);
  }

  render() {
    return (
      <>
        <FirebaseNotification />
        <Notification />
        {this.props.device === 'pc' ? (
          <>
            <MainAppBar></MainAppBar>
            <Switch>
              <Route exact={true} path="/" component={Top} />
              <Route exact={true} path="/timeline" component={TimeLine} />
              <Route path="/mailbox/:roomId?" component={MailBox} />
              <Route path="/character" component={MakeCharacter} />
            </Switch>
          </>
        ) : (
          <>
            <MainHeaderBar />
            <div style={{ minHeight: 'calc(100vh - 112px)' }}>
              <Switch>
                <Route exact={true} path="/" component={TopSP} />
                <Route exact={true} path="/timeline" component={TimeLineSP} />
                <Route exact={true} path="/mailbox" component={MailBoxSP} />
                <Route path="/character" component={MakeCharacterSP} />
              </Switch>
            </div>
            <MainFooterBar />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    device: state.device.device,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    setUserAgent(ua: string) {
      dispatch(setUserAgentAction(ua));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
