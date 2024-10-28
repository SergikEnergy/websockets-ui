import { ServerCommonMessages, StrOrNum } from './general';
import { PositionType, ShipInfoType, ShipStatusType } from './ships';

type ServerData =
  | LoginResponseData
  | UpdateWinnersData
  | CreateGameData
  | PlayerRoomData
  | StartGameData
  | AttackFeedbackData
  | TurnPlayerData
  | FinishData;

export type ClientRequestMessages = ServerCommonMessages<ServerData>;

export type LoginResponseData = {
  name: string;
  index: StrOrNum;
  error: boolean;
  errorText: string;
};

export type UpdateWinnersData = {
  name: string;
  wins: number;
};

export type CreateGameData = {
  idGame: StrOrNum;
  idPlayer: StrOrNum;
};

export type PlayerRoomInfo = {
  name: string;
  index: StrOrNum;
};

export type PlayerRoomData = {
  roomId: StrOrNum;
  roomUsers: PlayerRoomInfo[];
};

export type StartGameData = {
  ships: ShipInfoType[];
  currentPlayerIndex: StrOrNum;
};

export type AttackFeedbackData = {
  position: PositionType;
  currentPlayer: StrOrNum;
  status: ShipStatusType;
};

export type TurnPlayerData = {
  currentPlayer: StrOrNum;
};

export type FinishData = {
  winPlayer: StrOrNum;
};
