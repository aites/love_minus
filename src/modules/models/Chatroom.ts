import firebase, { db } from '../firebase';
import { Profile } from './Profile';

export type ChatRoom = {
  docId?: string;
  joinUsers: string[];
  ownerUid: string; // チャットオーナー(TimeLineに書いた人)
  playerUid: string; // チャットを申し込んだ人
  ownerInfo: Profile;
  playerInfo: Profile;
};

export async function createChatRoom(chatRoom: ChatRoom) {
  const db = firebase.firestore();
  const docId = db.collection('chatroom').doc().id;
  await db.collection('chatroom').doc(docId).set(chatRoom);
  return chatRoom;
}

type ChatRoomSearchOption = {
  limit: number;
};
export async function getChatRooms(option: ChatRoomSearchOption) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });
  console.log('currentUser', currentUser);
  const result = await db
    .collection('chatroom')
    .where('joinUsers', 'array-contains', currentUser)
    .limit(option.limit)
    .get();
  return result.docs.map((doc) => {
    const data = doc.data();
    data.docId = doc.id;
    return data as ChatRoom;
  });
}

export type ChatMessage = {
  chatroomId: string;
  ownerUid?: string;
  message: string;
};

type GetChatMessageOption = {
  chatroomId: string;
  limit: number;
};
export async function getChatMessage(option: GetChatMessageOption) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });
  const result = await db
    .collection('chatroom')
    .doc(option.chatroomId)
    .collection('message')
    .limit(option.limit)
    .get();
  return result.docs.map((doc) => {
    const data = doc.data();
    return data as ChatMessage;
  });
}
export async function postChatMessage(chatMessage: ChatMessage) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });

  chatMessage.ownerUid = currentUser as string;

  await db
    .collection('chatroom')
    .doc(chatMessage.chatroomId)
    .collection('message')
    .add(chatMessage);
  return chatMessage;
}
