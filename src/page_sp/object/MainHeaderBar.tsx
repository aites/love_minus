import React from 'react';
import AuthModal from './AuthModal';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { RootStateProps } from '../../redux/reducers';
import classes from '../../scss/page_sp/mainHeaderBar.module.scss';

class MainHeaderBar extends React.Component {
  render() {
    console.log(this.props);
    return (
      <AppBar position="sticky">
        <Toolbar>
          <h1>
            <img className={classes.logo} src="../images/logo.png" alt="LoveMinus" />
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
