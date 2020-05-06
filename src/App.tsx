import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.scss';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import TimeLine from './page/TimeLine';
import MailBox from './page/MailBox';
import MakeCharacter from './page/MakeCharacter';
import AuthModal from './object/AuthModal';
import Top from './page/Top';

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
    success: {
      main: '#bac778',
    },
  },
});

function App() {
  const [value, setValue] = React.useState(-1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <h1 className="title">
              <Link to="/" onClick={(e) => handleChange(e, -1)}>
                <img className="logo" src="../images/logo.png" alt="LoveMinus" />
              </Link>
            </h1>
            <Tabs
              value={value}
              TabIndicatorProps={{ style: { background: '#FFF' } }}
              onChange={handleChange}
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
        <Switch>
          <Route exact={true} path="/" component={Top} />
          <Route exact={true} path="/timeline" component={TimeLine} />
          <Route path="/mailbox" component={MailBox} />
          <Route path="/character" component={MakeCharacter} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
