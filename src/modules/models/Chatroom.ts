import firebase, { db, getCurrentUser } from '../firebase';
import { Profile } from './Profile';

export type ChatRoom = {
  docId?: string;
  joinUsers: string[];
  ownerUid: string; // チャットオーナー(TimeLineに書いた人)
  playerUid: string; // チャットを申し込んだ人
  ownerInfo: Profile;
  playerInfo: Profile;
  lastUpdateUser?: string;
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

type ChatRoomGetOption = {
  docId: string;
};
type ChatRoomSearchOption = {
  limit: number;
  hasPendingWrites?: boolean; // falseを指定した場合、サーバーのデータのみ取得する
};
export async function getChatRoom(option: ChatRoomGetOption) {
  const result = await db.collection('chatroom').doc(option.docId).get();
  const data = result.data();
  if (data) {
    data.docId = result.id;
  }
  return data as ChatRoom;
}
export async function getChatRooms(option: ChatRoomSearchOption) {
  const currentUser = (await getCurrentUser())?.uid;
  if (currentUser === null) throw new Error();
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
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    callback([]);
    return () => undefined;
  }
  return db
    .collection('chatroom')
    .where('joinUsers', 'array-contains', currentUser.uid)
    .limit(option.limit)
    .onSnapshot((snapShot) => {
      const list: ChatRoom[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data() as ChatRoom;
        data.docId = doc.id;
        list.push(data);
      });
      if (option.hasPendingWrites === false && snapShot.metadata.hasPendingWrites === true) return;
      callback(list);
    });
}

export type ChatMessage = {
  chatroomId: string;
  chatroomInfo?: ChatRoom;
  ownerUid?: string;
  message: string;
  createdAt?: firebase.firestore.FieldValue;
};

type GetChatMessageOption = {
  chatroomId: string;
  limit: number;
};
export async function getChatMessage(option: GetChatMessageOption) {
  const result = await db
    .collection('chatroom')
    .doc(option.chatroomId)
    .collection('message')
    .orderBy('createdAt', 'asc')
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
  const chatRoomRef = db.collection('chatroom').doc(option.chatroomId);
  const chatRoomInfo = (await chatRoomRef.get()).data() as ChatRoom;
  return chatRoomRef
    .collection('message')
    .limit(option.limit)
    .orderBy('createdAt', 'asc')
    .onSnapshot((snapShot) => {
      const list: ChatMessage[] = [];
      snapShot.forEach((doc) => {
        const data = doc.data() as ChatMessage;
        data.chatroomInfo = chatRoomInfo;
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
    lastUpdateUser: currentUser,
    lastMessage: chatMessage.message,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  await batch.commit();
  return chatMessage;
}
