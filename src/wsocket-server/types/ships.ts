export type ShipType = 'small' | 'medium' | 'large' | 'huge';
export type ShipStatusType = 'miss' | 'killed' | 'shot';

export type PositionType = {
  x: number;
  y: number;
};

export type ShipInfoType = {
  position: PositionType;
  direction: boolean;
  length: number;
  type: ShipType;
};
