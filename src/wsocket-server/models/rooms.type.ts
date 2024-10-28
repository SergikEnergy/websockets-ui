import { StrOrNum } from '../types/general';

export type RoomType = {
  roomId: StrOrNum;
  roomPlayers: RoomPlayerType[];
};

type RoomPlayerType = {
  name: string;
  index: StrOrNum;
};
