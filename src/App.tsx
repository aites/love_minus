import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import TimeLine from './page/TimeLine';
import MailBox from './page/MailBox';
import MakeCharacter from './page/MakeCharacter';
import Top from './page/Top';
import MainAppBar from './object/MainAppBar';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';

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
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <MainAppBar></MainAppBar>
          <Switch>
            <Route exact={true} path="/" component={Top} />
            <Route exact={true} path="/timeline" component={TimeLine} />
            <Route path="/mailbox" component={MailBox} />
            <Route path="/character" component={MakeCharacter} />
          </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
