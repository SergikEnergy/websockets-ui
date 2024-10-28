import { randomUUID } from 'crypto';
import { players } from '../collections/players';
import { PlayerRoomInfo } from '../types/server-messages';
import { socketClients } from '../collections/socket-clients';
import { stringifyData } from '../helpers/stringify-data';
import { RequestResponseTypes } from '../enums/request-response-types';
import { prepareResponse } from '../helpers/prepare-response';

export const createGame = (usersList: PlayerRoomInfo[]) => {
  const gameIndex = randomUUID() as string;

  const roomPlayers = players.getPlayers().filter((player) => {
    const foundUser = usersList.find((user) => user.index === player.index);
    return Boolean(foundUser);
  });

  socketClients.forEach((client, key) => {
    const activePlayer = roomPlayers.find((player) => player.sessionKey === key);
    if (!activePlayer) return;

    const data = stringifyData({
      idGame: gameIndex,
      idPlayer: activePlayer,
    });

    client.send(prepareResponse(RequestResponseTypes.CreateGame, data));
  });
};
