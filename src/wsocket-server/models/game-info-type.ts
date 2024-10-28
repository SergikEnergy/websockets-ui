import { StrOrNum } from '../types/general';
import { PositionType, ShipInfoType } from '../types/ships';

export type ShipInfoWithStatus = {
  shipId: StrOrNum;
  shipPosition: PositionType[];
  isShipKilled: boolean;
};

export type PlayerInfo = {
  playerId: StrOrNum;
  ships: ShipInfoType[];
  shipStatuses: ShipInfoWithStatus[];
};

export type GameInfo = {
  gameId: StrOrNum;
  gamePlayers: PlayerInfo[];
  currentPlayerIndex: StrOrNum | null;
};
