import React from 'react';
import logo from './logo.svg';
import {AppBar, Toolbar, Paper, Typography, Button, Modal, Fade} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Menu as MenuIcon} from '@material-ui/icons';
import './App.css';
import ProfileListCard, { ListProfileInterface } from './object/ProfileListCard';
import ProfileModal from './object/ProfileModal';

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
  const list:Array<ListProfileInterface> = [
    {name:"西園寺 日向", imageUrl:"/images/josei_07_a.png", simpleProf:"共学に通う高校生です\n自己主張激しめ？" },
    {name:"跡部景吾", imageUrl:"/images/atobe.jpg", simpleProf:"俺様の美技に酔いな"},
  ];
  const [showProfile, setProfileModal] = React.useState<ListProfileInterface|null>(null);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" >
            LoveMinus
          </Typography>
          <Button color="inherit">タイムライン</Button>
          <Button color="inherit">メールボックス</Button>
        </Toolbar>
      </AppBar>
      {list.map((list, i)=>{
        return (
          <Paper key={i} onClick={()=>{
            console.log("okclick");
            setProfileModal(list);
          }}>
            <ProfileListCard {...list} />
          </Paper>
        );
      })}
      <Modal 
        open={showProfile!=null}
        onClose={()=>{
          setProfileModal(null);
        }}
      >
        <Fade in={showProfile!=null}>
          {showProfile?<ProfileModal {...showProfile} />:<div></div>}
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}

export default App;
