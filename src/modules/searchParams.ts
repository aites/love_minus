// クエリパラメータの関係性をマッピング
const KEY = {
  chatRoomId: 'r',
};
export function getChatroomId(): string {
  const url = new URL(window.location.href);
  const roomId = url.searchParams.get(KEY.chatRoomId);
  return roomId || '';
}
