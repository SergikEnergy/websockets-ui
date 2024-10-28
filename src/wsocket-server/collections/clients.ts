import { UUIDType } from '../types/general';
import { type WebSocket } from 'ws';

export const socketClients = new Map<UUIDType, WebSocket>();
