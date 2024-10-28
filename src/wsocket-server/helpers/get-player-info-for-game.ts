import { PlayerInfo, ShipInfoWithStatus } from '../models/game-info-type';
import { ShipInfoType } from '../types/ships';
import { getShipPosition } from './get-ship-position';

export const getPlayerInfoForGame = (ships: ShipInfoType[], player: PlayerInfo): PlayerInfo => {
  const shipStatuses: ShipInfoWithStatus[] = [];

  ships.forEach((ship, ind) =>
    shipStatuses.push({ isShipKilled: false, shipId: `${ind}_${ship.type}`, shipPosition: getShipPosition(ship) })
  );

  return {
    ...player,
    shipStatuses,
  };
};
