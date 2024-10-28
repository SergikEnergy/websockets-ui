import { rooms } from '../collections/rooms';
import { socketClients } from '../collections/socket-clients';
import { RequestResponseTypes } from '../enums/request-response-types';
import { parseDataFromString } from '../helpers/parse-data-from-string';
import { prepareResponse } from '../helpers/prepare-response';
import { stringifyData } from '../helpers/stringify-data';
import { AddUserToRoomData } from '../types/client-messages';
import { ServerCommonMessagesWithDataString } from '../types/general';
import { players } from '../collections/players';
import { createGame } from './game';
import { MAX_PLAYERS } from '../constants/general';

export const createRoom = () => {
  rooms.getRoomById();
  updateRoomsRequest();
};

export const updateRoomsRequest = () => {
  socketClients.forEach((client) => {
    const allRoomsString = stringifyData(rooms.getRooms());

    client.send(prepareResponse(RequestResponseTypes.UpdateRoom, allRoomsString));
  });
};

export const addUserToRoom = (wsID: string, msg: ServerCommonMessagesWithDataString) => {
  const { indexRoom } = parseDataFromString(msg.data) as AddUserToRoomData;
  const currentPlayer = players.getPlayerBySessionKey(wsID);
  const currentRoom = rooms.getRoomById(indexRoom);
  if (!currentPlayer || !currentRoom) return;

  const samePlayerInRoom = currentRoom.roomPlayers.find((player) => player.index === currentPlayer.index);
  if (samePlayerInRoom) return;

  rooms.addPlayerToRoom(indexRoom, currentPlayer.name, currentPlayer.index);
  updateRoomsRequest();

  //await gaining two users to start game
  if (currentRoom.roomPlayers.length === MAX_PLAYERS) {
    createGame(currentRoom.roomPlayers);
    // if room is full (2 players) - remove and after that update
    rooms.removeRoomById(indexRoom);
    updateRoomsRequest();
  }
};
