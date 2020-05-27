import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { RootStateProps } from '../redux/reducers';

class MainHeaderBar extends React.Component {
  render() {
    console.log(this.props);
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Love Minus</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
