import React, { Component } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { connect } from 'react-redux';

type MainAppBarProps = {
  pathname: string;
  notifySuccess: Function;
};
type MainAppBarStates = {
  selectedTab: number;
};

class MainAppBar extends Component<MainAppBarProps, MainAppBarStates> {
  constructor(props: MainAppBarProps) {
    super(props);
    this.state = {
      selectedTab: this.getTabIndex(this.props.pathname),
    };
  }

  private getTabIndex(pathname: string) {
    if (pathname.indexOf('/timeline') === 0) return 0;
    if (pathname.indexOf('/mailbox') === 0) return 1;
    if (pathname.indexOf('/character') === 0) return 2;
    return -1;
  }
  componentDidUpdate(prevProps: MainAppBarProps) {
    if (this.props.pathname !== prevProps.pathname) {
      this.props.notifySuccess('ok');
      // Pathnameが変わったらインディケーターを入れ替える
      this.setState({
        selectedTab: this.getTabIndex(this.props.pathname),
      });
    }
  }

  render() {
    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <h1 className="title">
            <Link to="/" onClick={(e) => this.setState({ selectedTab: -1 })}>
              <img className="logo" src="../images/logo.png" alt="LoveMinus" />
            </Link>
          </h1>
          <Tabs
            value={this.state.selectedTab}
            TabIndicatorProps={{ style: { background: '#FFF' } }}
            aria-label="ヘッダーメニュー"
          >
            <Tab
              label={<span className="tabLabel">タイムライン</span>}
              component={Link}
              to="/timeline"
            />
            <Tab
              label={<span className="tabLabel">トークルーム</span>}
              component={Link}
              to="/mailbox"
            />
            <Tab
              label={<span className="tabLabel">キャラクター作成</span>}
              component={Link}
              to="/character"
            />
          </Tabs>
          <div style={{ flexGrow: 1 }}></div>
          <AuthModal />
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
  notifications: state.notifications,
});
const mapDispatchToProps = (dispatch: Function) => {
  return {
    notifySuccess(title: string) {
      //      dispatch(success({ title }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
