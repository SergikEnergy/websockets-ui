import { PositionType } from '../types/ships';

export const checkAttackedPosition = (attackCoordinates: PositionType, positions: PositionType[]) =>
  positions.find((item) => item.x === attackCoordinates.x && item.y === attackCoordinates.y);
