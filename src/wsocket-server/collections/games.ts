import { checkAttackedPosition } from '../helpers/check-attacked-position';
import { getPlayerInfoForGame } from '../helpers/get-player-info-for-game';
import { GameInfo, PlayerInfo } from '../models/game-info-type';
import { StrOrNum } from '../types/general';
import { PositionType, ShipStatusType } from '../types/ships';

export class Games {
  private games: GameInfo[] = [];

  getGames = () => this.games;

  addPlayerToGame = (gameId: StrOrNum, player: PlayerInfo) => {
    const existedGame = this.games.find((game) => game.gameId === gameId);
    if (!existedGame) {
      const gamePlayers: PlayerInfo[] = [];
      gamePlayers.push(getPlayerInfoForGame(player.ships, player));

      this.games.push({ currentPlayerIndex: null, gameId, gamePlayers });
    } else {
      existedGame.gamePlayers.push(getPlayerInfoForGame(player.ships, player));
    }
  };

  getGameResult = (
    game: GameInfo,
    partnerId: StrOrNum,
    attackCoordinates: PositionType
  ): ShipStatusType | undefined => {
    const partner = game.gamePlayers.find((user) => user.playerId === partnerId);
    if (!partner) return;

    const attackedShip = partner.shipStatuses.find((ship) =>
      checkAttackedPosition(attackCoordinates, ship.shipPosition)
    );
    if (!attackedShip) return 'miss';

    const { shipId } = attackedShip;
    const activeGameId = game.gameId;

    // change position and status ships
    this.games = this.games.map((elem) => {
      if (elem.gameId !== activeGameId) return elem;

      return {
        ...elem,
        gamePlayers: elem.gamePlayers.map((player) => {
          if (player.playerId !== partnerId) return player;

          return {
            ...player,
            shipStatuses: player.shipStatuses.map((ship) => {
              if (ship.shipId !== shipId) return ship;

              return {
                ...ship,
                isShipKilled: !ship.shipPosition.length,
                shipPosition: ship.shipPosition.filter(
                  (item) => !(item.x === attackCoordinates.x && item.y === attackCoordinates.y)
                ),
              };
            }),
          };
        }),
      };
    });

    const activeGame = this.games.find((elem) => elem.gameId === activeGameId);
    const resAttackedShip = activeGame?.gamePlayers
      .find((game) => game.playerId === partnerId)
      ?.shipStatuses?.find((item) => item.shipId === shipId);
    if (!resAttackedShip) return 'miss';

    return resAttackedShip.isShipKilled ? 'killed' : 'shot';
  };

  removeGameById = (gameId: StrOrNum) => (this.games = this.games.filter((game) => game.gameId !== gameId));
}

export const games = new Games();
