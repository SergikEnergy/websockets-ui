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
  indexPlayer: StrOrNum;
};

export type AttackData = PositionType & {
  gameId: StrOrNum;
  indexPlayer: StrOrNum;
};

export type RandomAttackData = {
  gameId: StrOrNum;
  indexPlayer: StrOrNum;
};
