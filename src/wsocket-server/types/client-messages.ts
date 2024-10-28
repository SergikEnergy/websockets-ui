import { ServerCommonMessages, StrOrNum } from './general';
import { PositionType, ShipInfoType } from './ships';

type ClientData = LoginRequestData | CreateRoomData | AddUserToRoomData | AddShipsData | AttackData | RandomAttackData;

export type ClientRequestMessages = ServerCommonMessages<ClientData>;

export type LoginRequestData = {
  name: string;
  password: string;
};

export type CreateRoomData = '';

export type AddUserToRoomData = {
  indexRoom: StrOrNum;
};

export type AddShipsData = {
  gameId: StrOrNum;
  ships: ShipInfoType[];
  indexPlayer: ExpandedPlayer;
};

export type ExpandedPlayer = LoginRequestData & { sessionKey: StrOrNum; index: StrOrNum };

export type AttackData = PositionType & {
  gameId: StrOrNum;
  indexPlayer: StrOrNum | ExpandedPlayer;
};

export type RandomAttackData = {
  gameId: StrOrNum;
  indexPlayer: StrOrNum;
};
