import React from 'react';
import { AppBar, Toolbar, Paper, Typography, Button, Modal, Fade } from '@material-ui/core';
import ProfileListCard from '../object/ProfileListCard';
import ProfileModal from '../object/ProfileModal';
import classes from './timeLine.module.scss';
import { getTimeLine, Profile } from '../modules/models/Profile';

const list: Array<Profile> = [
  {
    name: '西園寺 日向',
    miniIcon: '/images/josei_07_a.png',
    simpleProf: '共学に通う高校生です\n自己主張激しめ？',
    icon: '/images/josei_07_b.png',
    profile: '',
    sex: 2,
  },
  {
    name: '跡部景吾',
    sex: 1,
    miniIcon: '/images/atobe.jpg',
    simpleProf: '俺様の美技に酔いな',
    icon: '/images/atobe_b.png',
    profile:
      '氷帝学園中等部テニス部部長。別名「王様(キング)」(本人命名)。\n中等部の生徒会長でもあり、跡部財閥の御曹司。作中内外ともに通称「跡部様」。\n部員200人の頂点に立つ男と称されるカリスマ。いつも樺地崇弘を従えている。\n\nオールラウンダーであり、すべての技術においてトップクラスを誇るが、その中でも千石清純曰く、相手の弱点を見抜く眼力(インサイト)はズバ抜けている。\n決め台詞の「俺様の美技に酔いな」にあるように、繰り出す得意技(破滅への輪舞曲、氷の世界などは)美技と呼ばれる。',
  },
];

type TimeLineProps = {};
interface TimeLineState {
  profileList: Profile[];
  showProfile: Profile | null;
}

export default class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
  constructor(props: TimeLineProps) {
    super(props);
    this.state = {
      profileList: [],
      showProfile: null,
    };
  }
  componentDidMount() {
    console.log('did mount');
    getTimeLine({
      limit: 30,
    }).then((data) => {
      console.log(data);
      this.setState({
        profileList: data,
      });
    });
  }

  render() {
    const showProfile = this.state.showProfile;
    return (
      <>
        {this.state.profileList.map((profile, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                console.log('okclick');
                this.setState({ showProfile: profile });
                console.log(showProfile);
              }}
            >
              <ProfileListCard {...profile} />
            </div>
          );
        })}
        <Modal
          open={showProfile != null}
          onClose={() => {
            this.setState({ showProfile: null });
          }}
        >
          <Fade in={showProfile != null}>
            {showProfile ? <ProfileModal {...showProfile} /> : <div></div>}
          </Fade>
        </Modal>
      </>
    );
  }
}
