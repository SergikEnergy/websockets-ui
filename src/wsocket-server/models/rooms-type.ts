import { StrOrNum } from '../types/general';
import { PlayerRoomInfo } from '../types/server-messages';

export type RoomType = {
  roomId: StrOrNum;
  roomPlayers: PlayerRoomInfo[];
};
