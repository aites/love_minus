import React, { Component } from 'react';
import {
  Paper,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Modal,
  Backdrop,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { RootStateProps } from '../../redux/reducers';
import classes from '../../scss/page_sp/object/profileModal.module.scss';
import { Profile } from '../../modules/models/Profile';
import { createChatRoom } from '../../modules/models/Chatroom';
import { getCurrentUser } from '../../modules/firebase';
import { characterList } from '../../modules/models/Character';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

type ProfileModalProps = {
  profile: Profile;
  loginUserUid?: string;
  pathname: string;
  onCreateChatroom: (roomId: string) => void;
};
type ProfileModalStates = {
  name: string;
  sex: 'man' | 'woman';
  profile: Profile;
  icon: string;
  minIcon: string;
  iconModal: boolean;
};

class ProfileModal extends Component<ProfileModalProps, ProfileModalStates> {
  constructor(props: ProfileModalProps) {
    super(props);
    this.state = {
      profile: props.profile,
      sex: 'man',
      name: '',
      icon: '',
      minIcon: characterList[0].icon,
      iconModal: false,
    };
    this.createChatroom = this.createChatroom.bind(this);
  }

  async createChatroom() {
    const ownerUid = this.state.profile.author;
    const playerInfo = await getCurrentUser();
    const profileId = this.state.profile.profileId;
    if (!playerInfo || !ownerUid || !profileId) throw new Error();
    const playerUid = playerInfo.uid;
    return await createChatRoom({
      profileId: profileId,
      joinUsers: [ownerUid, playerUid],
      ownerUid,
      playerUid,
      lastUpdateUser: playerUid,
      ownerInfo: this.state.profile,
      playerInfo: {
        name: this.state.name,
        sex: this.state.sex,
        icon: this.state.icon,
        miniIcon: this.state.minIcon,
        profile: '',
        simpleProf: '',
        author: playerUid,
      },
    });
  }

  render() {
    const prof = this.state.profile;
    const handleOpen = () => {
      this.setState({ iconModal: true });
    };
    const handleClose = () => {
      this.setState({ iconModal: false });
    };

    // input入力箇所の表示判定
    let inputForm = null;
    if (this.props.loginUserUid !== prof.author && this.props.pathname === '/timeline') {
      inputForm = (
        <>
          <Box className={classes.inputForm}>
            <TextField
              id="name"
              label="名前"
              variant="outlined"
              className={classes.textField}
              value={this.state.name}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            ></TextField>
            <FormControl variant="outlined" className={classes.selectBox}>
              <InputLabel id="sex">性別</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={this.state.sex}
                onChange={(e) => {
                  this.setState({ sex: e.target.value as 'man' | 'woman' });
                }}
                label="性別"
                className={classes.selectBox}
              >
                <MenuItem value={'man'}>男</MenuItem>
                <MenuItem value={'woman'}>女</MenuItem>
              </Select>
            </FormControl>
            <Box className={classes.selectIcon}>
              <img
                src={this.state.minIcon}
                alt="アイコン"
                className={classes.selectIconImg}
                onClick={handleOpen}
              />
              <ArrowDropDownIcon className={classes.downIcon} />
            </Box>
          </Box>
          <Box mt={2}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={async () => {
                const chatRoom = await this.createChatroom();
                this.props.onCreateChatroom(chatRoom);
              }}
            >
              チャット開始
            </Button>
          </Box>
          <Modal
            className={classes.selectIconModal}
            open={this.state.iconModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Grid container direction="row" justify="center" alignItems="center">
              {characterList.map((v, i) => {
                return (
                  <Grid item xs={2} className={classes.icon_content}>
                    <Paper className={classes.image_icon_wrap}>
                      <img
                        className={classes.image_icon}
                        src={v.icon}
                        alt=""
                        onClick={() => {
                          this.setState({ icon: v.image, minIcon: v.icon });
                          handleClose();
                        }}
                      />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Modal>
        </>
      );
    }

    return (
      <Paper className={classes.modal}>
        <Box className={classes.contents}>
          <Box className={classes.nameWrapper}>
            <img className={classes.image} src={prof.miniIcon} alt="" />
            <p className={classes.name}>{prof.name}</p>
          </Box>
          <p className={classes.profile}>{prof.profile}</p>
          {inputForm}
        </Box>
      </Paper>
    );
  }
}

const mapStateToProps = (state: RootStateProps) => ({
  pathname: state.router.location.pathname,
});
const mapDispatchToProps = (dispatch: Function) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
