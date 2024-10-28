import type { WebSocket } from 'ws';
import { RequestResponseTypes } from '../enums/request-response-types';
import { randomUUID } from 'crypto';

export type UUIDType = ReturnType<typeof randomUUID>;

export type StrOrNum = string | number;

export type ServerCommonMessages<T> = {
  type: RequestResponseTypes;
  data: T;
  id: number;
};

export type ServerCommonMessagesWithDataString = ServerCommonMessages<string>;

export type ConnectionIfo = {
  userIndex: string | number;
  ws: WebSocket;
};
