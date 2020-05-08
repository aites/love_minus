import React, { Component } from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

type MainAppBarProps = {};
type MainAppBarStates = {
  selectedTab: number;
};

class MainAppBar extends Component<MainAppBarProps, MainAppBarStates> {
  constructor(props: MainAppBarProps) {
    super(props);
    this.state = {
      selectedTab: -1,
    };
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
            onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
              this.setState({ selectedTab: newValue });
            }}
            aria-label="ヘッダーメニュー"
          >
            <Tab
              label={<span className="tabLabel">タイムライン</span>}
              component={Link}
              to="/timeline"
            />
            <Tab
              label={<span className="tabLabel">メールボックス</span>}
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
export default MainAppBar;
