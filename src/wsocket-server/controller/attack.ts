import { games } from '../collections/games';
import { players } from '../collections/players';
import { socketClients } from '../collections/socket-clients';
import { winners } from '../collections/winners';
import { RequestResponseTypes } from '../enums/request-response-types';
import { getRandomCoordinates } from '../helpers/get-random-coordinates';
import { parseDataFromString } from '../helpers/parse-data-from-string';
import { prepareResponse } from '../helpers/prepare-response';
import { stringifyData } from '../helpers/stringify-data';
import { GameInfo } from '../models/game-info-type';
import { AttackData } from '../types/client-messages';
import { ServerCommonMessagesWithDataString, StrOrNum } from '../types/general';
import { PositionType, ShipStatusType } from '../types/ships';
import { turnGame } from './game';
import { sendWinnersRequest } from './winners';

export const attack = (msg: ServerCommonMessagesWithDataString) => {
  const { indexPlayer: rawIndex, x: xPos, y: yPos, gameId } = parseDataFromString(msg.data) as AttackData;

  const indexPlayer = typeof rawIndex === 'string' || typeof rawIndex === 'number' ? rawIndex : rawIndex.index;

  const attackCoordinates: PositionType = { x: xPos ?? getRandomCoordinates(), y: yPos ?? getRandomCoordinates() };

  const activeGame = games.getGames().find((game) => game.gameId === gameId);
  if (!activeGame || activeGame.currentPlayerIndex !== indexPlayer) return;

  const partner = activeGame.gamePlayers.find((player) => player.playerId !== indexPlayer);
  if (!partner) return;

  const attackInfo = partner.shipStatuses.find((elem) =>
    elem.shipPosition.find((item) => item.x === attackCoordinates.x && item.y === attackCoordinates.y)
  );

  if (!attackInfo) {
    // missed - turn attack
    prepareGameAttackMessage(activeGame, indexPlayer, attackCoordinates, 'miss');
    turnGame(activeGame.gameId, partner.playerId);
  } else {
    // check kill or shot
    const gameStatus = games.getGameResult(activeGame, partner.playerId, attackCoordinates);
    if (gameStatus) {
      prepareGameAttackMessage(activeGame, indexPlayer, attackCoordinates, gameStatus);
      turnGame(activeGame.gameId, indexPlayer);
    }
    const currPlayers = activeGame.gamePlayers;
    const losePlayer = currPlayers.find((info) => info.shipStatuses.every((ship) => ship.isShipKilled));
    if (!losePlayer) return;
    const winner = currPlayers.find((info) => info.playerId !== losePlayer.playerId);
    if (!winner) return;

    console.log(`Hurra! Game with ID:${activeGame.gameId} finished! Player with ID:${winner.playerId} is winner!`);

    endGame(winner.playerId);
  }
};

export const endGame = (winnerId: StrOrNum): void => {
  socketClients.forEach((client) => {
    const resDataStr = stringifyData({ winPlayer: winnerId });

    const winner = players.getPlayers().find((user) => user.index === winnerId);
    if (winner) {
      winners.addWinner(winner.name);
    }
    client.send(prepareResponse(RequestResponseTypes.Finish, resDataStr));
    sendWinnersRequest();
  });
};

const prepareGameAttackMessage = (
  activeGame: GameInfo,
  currentPlayer: StrOrNum,
  position: PositionType,
  status: ShipStatusType
) => {
  const { gamePlayers } = activeGame;
  const gameUsers = players
    .getPlayers()
    .filter((user) => gamePlayers.find((playerInfo) => playerInfo.playerId === user.index));

  socketClients.forEach((client, key) => {
    if (!gameUsers || !gameUsers.find((user) => user.sessionKey === key)) return;

    const resDataStr = stringifyData({ position, currentPlayer, status });

    client.send(prepareResponse(RequestResponseTypes.Attack, resDataStr));
  });
};
