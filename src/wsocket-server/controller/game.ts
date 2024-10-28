import { randomUUID } from 'crypto';
import { players } from '../collections/players';
import { PlayerRoomInfo } from '../types/server-messages';
import { socketClients } from '../collections/socket-clients';
import { stringifyData } from '../helpers/stringify-data';
import { RequestResponseTypes } from '../enums/request-response-types';
import { prepareResponse } from '../helpers/prepare-response';
import { StrOrNum } from '../types/general';
import { games } from '../collections/games';

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

export const startGame = (gameId: StrOrNum) => {
  const activeGame = games.getGames().find((game) => game.gameId === gameId);
  if (!activeGame) return;

  const { gamePlayers } = activeGame;
  const allPlayers = players.getPlayers();
  const gamers = allPlayers.filter((user) => gamePlayers.find((info) => info.playerId === user.index));

  socketClients.forEach((client, key) => {
    const currGamer = gamers.find((info) => info.sessionKey === key);
    if (!currGamer) return;

    const activePlayer = gamePlayers.find((user) => user.playerId === currGamer?.index);
    const resDataStr = stringifyData({ ships: activePlayer?.ships, currentPlayerIndex: activePlayer?.playerId });

    client.send(prepareResponse(RequestResponseTypes.StartGame, resDataStr));
  });

  console.log(`Start game with ID:${gameId}!`);
};

export const turnGame = (gameId: StrOrNum, indexPlayer: StrOrNum) => {
  const activeGame = games.getGames().find((item) => item.gameId === gameId);
  if (!activeGame) return;

  const { gamePlayers } = activeGame;

  const gamers = players.getPlayers().filter((user) => gamePlayers.find((info) => info.playerId === user.index));
  activeGame.currentPlayerIndex = indexPlayer;
  socketClients.forEach((client, key) => {
    const activeSession = gamers.find((user) => user.sessionKey === key);
    if (!activeSession) return;

    const resDataStr = stringifyData({ currentPlayer: indexPlayer });
    client.send(prepareResponse(RequestResponseTypes.Turn, resDataStr));
  });
};
