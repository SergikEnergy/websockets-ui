import { parseDataFromString } from '../helpers/parse-data-from-string';
import { AddShipsData } from '../types/client-messages';
import { ServerCommonMessagesWithDataString } from '../types/general';
import { games } from '../collections/games';
import { PlayerInfo } from '../models/game-info-type';
import { MAX_PLAYERS } from '../constants/general';
import { startGame, turnGame } from './game';

export const addShips = (msg: ServerCommonMessagesWithDataString) => {
  const { gameId, ships, indexPlayer } = parseDataFromString(msg.data) as AddShipsData;

  const playerInfo: PlayerInfo = {
    playerId: indexPlayer?.index ?? indexPlayer,
    ships,
    shipStatuses: [],
  };

  games.addPlayerToGame(gameId, playerInfo);
  const currGame = games.getGames().find((game) => game.gameId === gameId);
  if (!currGame || currGame.gamePlayers.length !== MAX_PLAYERS) return;

  const gameStarter = currGame.gamePlayers[0]; //start always first player
  if (!gameStarter) return;

  startGame(gameId);
  //allow partner to get next attack
  turnGame(gameId, gameStarter.playerId);
};
