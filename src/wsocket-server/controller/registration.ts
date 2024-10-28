import { parseDataFromString } from '../helpers/parse-data-from-string';
import { LoginRequestData } from '../types/client-messages';
import { ServerCommonMessagesWithDataString, UUIDType } from '../types/general';
import { type WebSocket } from 'ws';
import { players } from '../collections/players';
import { stringifyData } from '../helpers/stringify-data';
import { prepareResponse } from '../helpers/prepare-response';
import { RequestResponseTypes } from '../enums/request-response-types';
import { updateRoomsRequest } from './rooms';
import { sendWinnersRequest } from './winners';

export const registration = (ws: WebSocket, msg: ServerCommonMessagesWithDataString, sessionKey: UUIDType) => {
  const { data } = msg;

  const { name, password } = parseDataFromString(data) as LoginRequestData;
  try {
    const player = players.getPlayerByCredentials(name, password, sessionKey);
    const response = stringifyData({ name: name ?? '', index: player?.index, error: false, errorText: '' });

    ws.send(prepareResponse(RequestResponseTypes.Registration, response));
  } catch (err) {
    const response = stringifyData({
      name: name ?? '',
      index: '',
      error: true,
      errorText: err instanceof Error ? err.message : 'Failed get user data.',
    });

    ws.send(prepareResponse(RequestResponseTypes.Registration, response));
  } finally {
    updateRoomsRequest();
    sendWinnersRequest();
  }
};
