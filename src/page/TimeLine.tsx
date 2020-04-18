import React from 'react';
import {AppBar, Toolbar, Paper, Typography, Button, Modal, Fade} from '@material-ui/core';
import ProfileListCard, { ListProfileInterface } from '../object/ProfileListCard';
import ProfileModal from '../object/ProfileModal';

function TimeLine(){
  const list:Array<ListProfileInterface> = [
    {name:"西園寺 日向", imageUrl:"/images/josei_07_a.png", simpleProf:"共学に通う高校生です\n自己主張激しめ？" },
    {name:"跡部景吾", imageUrl:"/images/atobe.jpg", simpleProf:"俺様の美技に酔いな"},
  ];
  const [showProfile, setProfileModal] = React.useState<ListProfileInterface|null>(null);
  return (
    <div>
      {list.map((list, i)=>{
        return (
          <div key={i} onClick={()=>{
            console.log("okclick");
            setProfileModal(list);
          }}>
            <ProfileListCard {...list} />
          </div>
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
    </div>
  );
}

export default TimeLine;