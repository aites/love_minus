import React from "react";
import logo from "./logo.svg";
import {
  AppBar,
  Toolbar,
  Paper,
  Typography,
  Button,
  Modal,
  Fade,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import ProfileListCard, {
  ListProfileInterface,
} from "./object/ProfileListCard";
import {BrowserRouter as Router,Link,Route,Switch,} from 'react-router-dom';
import ProfileModal from "./object/ProfileModal";
import TimeLine from './page/TimeLine';
import MailBox from './page/MailBox';
import MakeCharacter from "./page/MakeCharacter";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ff4400",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
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
  const list: Array<ListProfileInterface> = [
    {
      name: "西園寺 日向",
      imageUrl: "/images/josei_07_a.png",
      simpleProf: "共学に通う高校生です\n自己主張激しめ？",
      modalImage: "/images/josei_07_b.png",
      profile: "",
    },
    {
      name: "跡部景吾",
      imageUrl: "/images/atobe.jpg",
      simpleProf: "俺様の美技に酔いな",
      modalImage: "/images/atobe_b.png",
      profile:
        "氷帝学園中等部テニス部部長。別名「王様(キング)」(本人命名)。\n中等部の生徒会長でもあり、跡部財閥の御曹司。作中内外ともに通称「跡部様」。\n部員200人の頂点に立つ男と称されるカリスマ。いつも樺地崇弘を従えている。\n\nオールラウンダーであり、すべての技術においてトップクラスを誇るが、その中でも千石清純曰く、相手の弱点を見抜く眼力(インサイト)はズバ抜けている。\n決め台詞の「俺様の美技に酔いな」にあるように、繰り出す得意技(破滅への輪舞曲、氷の世界などは)美技と呼ばれる。",
    },
  ];
  const [
    showProfile,
    setProfileModal,
  ] = React.useState<ListProfileInterface | null>(null);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6">LoveMinus</Typography>
          <Link to="/timeline"><Button color="inherit">タイムライン</Button></Link>
          <Link to="/mailbox"><Button color="inherit">メールボックス</Button></Link>
          <Link to="/character"><Button color="inherit">キャラクター作成</Button></Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact={true} path="/timeline" component={TimeLine} />
        <Route path="/mailbox" component={MailBox} />
        <Route path="/character" component={MakeCharacter} />
        
      </Switch>
      <Modal
        open={showProfile != null}
        onClose={() => {
          setProfileModal(null);
        }}
      >
        <Fade in={showProfile != null}>
          {showProfile ? <ProfileModal {...showProfile} /> : <div></div>}
        </Fade>
      </Modal>
      </Router>
    </ThemeProvider>
  );
}

export default App;
