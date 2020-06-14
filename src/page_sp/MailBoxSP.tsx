import React from 'react';
import { RootStateProps } from '../redux/reducers';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { User } from 'firebase';
import { getTimeLine, Profile } from '../modules/models/Profile';
import { ChatRoom as ChatRoomModel } from '../modules/models/Chatroom';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { selectRoom } from '../redux/reducers/chatMessageReducer';
import ChatRoom from './ChatRoomSP';

type Props = {
  roomId?: string;
  currentUserUID: string;
  isLoading: boolean;
  chatrooms: ChatRoomModel[];
  updateChatRoom: Function;
};
type State = {
  profileList: Profile[];
};

class MailBoxSP extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profileList: [],
    };
  }

  render() {
    const theme = createMuiTheme();
    const { chatrooms, currentUserUID } = this.props;

    return (
      <>
        <ChatRoom />
        <List>
          {chatrooms.map((room, i) => {
            const userInfo = room.ownerUid === currentUserUID ? room.playerInfo : room.ownerInfo;
            return (
              <React.Fragment key={i}>
                <ListItem
                  alignItems="flex-start"
                  divider={true}
                  style={{ paddingLeft: '8px' }}
                  onClick={() => this.props.updateChatRoom(room.docId)}
                >
                  <ListItemAvatar style={{ margin: '0' }}>
                    <Avatar
                      alt="alt"
                      src={userInfo.miniIcon}
                      style={{ width: theme.spacing(7), height: theme.spacing(7) }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={userInfo.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {room.lastMessage}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
              //{JSON.stringify(profile)}
            );
          })}
        </List>
      </>
    );
  }
}

function mapStateToProps(state: RootStateProps) {
  return {
    roomId: state.chatmessage.roomId,
    currentUserUID: state.firebase.user?.uid || '',
    ...state.chatroom,
  };
}
const mapDispatchToProps = (dispatch: Function) => {
  return {
    updateChatRoom(roomId: string) {
      dispatch(selectRoom(roomId));
      dispatch(push(`/mailbox?r=${roomId}`));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MailBoxSP);
