import { PositionType, ShipInfoType } from '../types/ships';

export const getShipPosition = (ship: ShipInfoType): PositionType[] => {
  const positions: PositionType[] = Array.from({ length: ship.length });
  // direction true means vertical
  return positions.map((_, index) => {
    if (ship.direction) {
      return { x: ship.position.x, y: ship.position.y + index };
    } else {
      return { x: ship.position.x + index, y: ship.position.y };
    }
  });
};
