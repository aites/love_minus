import React from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootStateProps } from '../../redux/reducers';
import classes from '../../scss/page_sp/mainHeaderBar.module.scss';

class MainHeaderBar extends React.Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <h1 className={classes.logoWrapper}>
            <Link to="/" onClick={(e) => this.setState({ selectedTab: -1 })}>
              <img className={classes.logo} src="../images/logo.png" alt="LoveMinus" />
            </Link>
          </h1>
          <AuthModal />
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = (state: RootStateProps) => ({});
const mapDispatchToProps = (dispatch: Function) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderBar);
