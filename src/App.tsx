import React from 'react';
import {AppBar, Toolbar, Paper, Typography, Button, Modal, Fade} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import {BrowserRouter as Router,Link,Route,Switch,} from 'react-router-dom';
import TimeLine from './page/TimeLine';
import MailBox from './page/MailBox';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" >
              LoveMinus
            </Typography>
            <Link to="/timeline"><Button color="inherit">タイムライン</Button></Link>
            <Link to="/mailbox"><Button color="inherit">メールボックス</Button></Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact={true} path="/timeline" component={TimeLine} />
          <Route path="/mailbox" component={MailBox} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
