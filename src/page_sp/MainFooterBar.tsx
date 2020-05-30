import React from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import classes from '../scss/page_sp/mainFooterBar.module.scss';
import { RootStateProps } from '../redux/reducers';

type Props = {
  pathname: string;
};
class MainFooterBar extends React.Component<Props> {
  PathnameToMap: { [s: string]: number } = {
    '/timeline': 0,
    '/mailbox': 1,
    '/character': 2,
  };
  render() {
    const pageValue = this.PathnameToMap[this.props.pathname];
    return (
      <div className={classes.mainFooterBar}>
        <BottomNavigation value={pageValue} showLabels onChange={(event, value) => {}}>
          <BottomNavigationAction
            component={Link}
            to="/timeline"
            label="タイムライン"
            icon={<PeopleIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/mailbox"
            label="トークルーム"
            icon={<ForumIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/character"
            label="マイルーム"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </div>
    );
  }
}

const mapStateToProps = (state: RootStateProps) => ({
  pathname: state.router.location.pathname,
});
const mapDispatchToProps = (dispatch: Function) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(MainFooterBar);
