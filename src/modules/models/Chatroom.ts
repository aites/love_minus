import firebase, { db } from '../firebase';
import { Profile } from './Profile';

export type ChatRoom = {
  docId?: string;
  joinUsers: string[];
  ownerUid: string; // チャットオーナー(TimeLineに書いた人)
  playerUid: string; // チャットを申し込んだ人
  ownerInfo: Profile;
  playerInfo: Profile;
  lastMessage?: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
};

export async function createChatRoom(chatRoom: ChatRoom) {
  const db = firebase.firestore();
  const docId = db.collection('chatroom').doc().id;
  await db
    .collection('chatroom')
    .doc(docId)
    .set({
      ...chatRoom,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
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

export async function getChatRoomsSnapShot(
  option: ChatRoomSearchOption,
  callback: (chatroom: ChatRoom[]) => void
) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });
  return db
    .collection('chatroom')
    .where('joinUsers', 'array-contains', currentUser)
    .limit(option.limit)
    .onSnapshot((snapShot) => {
      const list: ChatRoom[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data() as ChatRoom;
        data.docId = doc.id;
        list.push(data);
      });
      callback(list);
    });
}

export type ChatMessage = {
  chatroomId: string;
  ownerUid?: string;
  message: string;
  createdAt?: firebase.firestore.FieldValue;
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
export async function getChatMessageSnapShot(
  option: GetChatMessageOption,
  callback: (chatroom: ChatMessage[]) => void
) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });

  return db
    .collection('chatroom')
    .doc(option.chatroomId)
    .collection('message')
    .limit(option.limit)
    .onSnapshot((snapShot) => {
      const list: ChatMessage[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data() as ChatMessage;
        list.push(data);
      });
      callback(list);
    });
}
export async function postChatMessage(chatMessage: ChatMessage) {
  const currentUser = await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user?.uid);
    });
  });
  chatMessage.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  chatMessage.ownerUid = currentUser as string;
  const batch = db.batch();
  const roomRef = db.collection('chatroom').doc(chatMessage.chatroomId);
  const messageRef = roomRef.collection('message').doc();
  batch.set(messageRef, chatMessage);
  batch.update(roomRef, {
    lastMessage: chatMessage.message,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await batch.commit();
  return chatMessage;
}
