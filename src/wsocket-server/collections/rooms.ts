import { randomUUID } from 'crypto';
import type { RoomType } from '../models/rooms-type';
import { StrOrNum } from '../types/general';
import { MAX_PLAYERS } from '../constants/general';

export class Rooms {
  private rooms: RoomType[] = [];

  getRooms = (): RoomType[] => {
    return this.rooms;
  };

  createRoom = () => {
    const newRoomId = randomUUID();
    const newRoom: RoomType = {
      roomId: newRoomId,
      roomUsers: [],
    };
    this.rooms.push(newRoom);
    return newRoom;
  };

  findRoomById = (id?: StrOrNum) => (!!id ? this.rooms.find((room) => room.roomId === id) : undefined);

  getRoomById = (id?: StrOrNum): RoomType => {
    const foundRoom = this.findRoomById(id);
    if (foundRoom) return foundRoom;

    return this.createRoom();
  };

  removeRoomById = (id: StrOrNum) => {
    this.rooms = this.rooms.filter((room) => room.roomId !== id);
  };

  addPlayerToRoom = (roomId: StrOrNum, playerName: string, playerIndex: StrOrNum) => {
    const foundRoom = this.findRoomById(roomId);
    if (!foundRoom || foundRoom.roomUsers.length >= MAX_PLAYERS) return null;

    foundRoom.roomUsers.push({ index: playerIndex, name: playerName });
    return foundRoom;
  };

  removePlayerFromRoom = (roomId: StrOrNum, playerIndex: StrOrNum) => {
    const foundRoom = this.findRoomById(roomId);
    if (!foundRoom) return;
    foundRoom.roomUsers = foundRoom.roomUsers.filter((player) => player.index !== playerIndex);
  };
}

export const rooms = new Rooms();
