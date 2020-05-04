import firebase, { db } from '../firebase';
import { Profile } from './Profile';

export type ChatRoom = {
  joinUsers: string[];
  ownerUid: string; // チャットオーナー(TimeLineに書いた人)
  playerUid: string; // チャットを申し込んだ人
  onwerInfo: Profile;
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
  const currentUser = firebase.auth().currentUser?.uid || '';
  const result = await db
    .collection('chatroom')
    .where('joinUsers', 'array-contains', currentUser)
    .limit(option.limit)
    .get();
  return result.docs.map((doc) => {
    const data = doc.data();
    return data as ChatRoom;
  });
}
