import { randomUUID } from 'crypto';
import type { RoomType } from '../models/rooms.type';
import { StrOrNum } from '../types/general';

//max players are 2
const MAX_PLAYERS = 2;

export class Rooms {
  private rooms: RoomType[] = [];

  getRooms = (): RoomType[] => {
    return this.rooms;
  };

  createRoom = () => {
    const newRoomId = randomUUID();
    const newRoom: RoomType = {
      roomId: newRoomId,
      roomPlayers: [],
    };
    this.rooms.push(newRoom);
    return newRoom;
  };

  findRoomById = (id: StrOrNum) => this.rooms.find((room) => room.roomId === id);

  getRoomById = (id: StrOrNum): RoomType => {
    const foundRoom = this.findRoomById(id);
    if (foundRoom) return foundRoom;

    return this.createRoom();
  };

  removeRoomById = (id: StrOrNum) => {
    this.rooms = this.rooms.filter((room) => room.roomId !== id);
  };

  addPlayerToRoom = (roomId: StrOrNum, playerName: string, playerIndex: StrOrNum) => {
    const foundRoom = this.findRoomById(roomId);
    if (!foundRoom || foundRoom.roomPlayers.length >= MAX_PLAYERS) return null;

    foundRoom.roomPlayers.push({ index: playerIndex, name: playerName });
    return foundRoom;
  };

  removePlayerFromRoom = (roomId: StrOrNum, playerIndex: StrOrNum) => {
    const foundRoom = this.findRoomById(roomId);
    if (!foundRoom) return;
    foundRoom.roomPlayers = foundRoom.roomPlayers.filter((player) => player.index !== playerIndex);
  };
}

export const rooms = new Rooms();
