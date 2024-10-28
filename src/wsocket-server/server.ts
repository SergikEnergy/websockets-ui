import { type RawData, WebSocketServer, type WebSocket } from 'ws';
import { randomUUID } from 'crypto';
import { config } from 'dotenv';
import { socketClients } from './collections/socket-clients';
import { RequestResponseTypes } from './enums/request-response-types';
import { registration } from './controller/registration';
import { ServerCommonMessagesWithDataString, UUIDType } from './types/general';
import { createGame } from './controller/game';
import { addUserToRoom, createRoom } from './controller/rooms';

config();

export const startWsServer = () => {
  const APP_PORT = process.env.APP_PORT || 3005;
  const ws = new WebSocketServer({ port: Number(APP_PORT) });

  ws.on('connection', onConnection);

  ws.on('error', (error) => {
    console.error(error);
  });

  console.log(`WebSocket server is listening on port: ${APP_PORT}!`);
};

const onConnection = (wsClient: WebSocket) => {
  const clientKey = randomUUID();

  socketClients.set(clientKey, wsClient);

  wsClient.on('message', (message: RawData) => {
    try {
      const clientMessage: ServerCommonMessagesWithDataString = JSON.parse(message.toString());

      clientsMessagesHandler(wsClient, clientKey, clientMessage);
    } catch (error) {
      console.log(error);
    }
  });

  wsClient.on('close', () => {
    // TODO add statistics messages

    console.log('User was disconnected');
  });

  console.log(`User with index ${clientKey} connected`);
};

const clientsMessagesHandler = (ws: WebSocket, key: UUIDType, clientMessage: ServerCommonMessagesWithDataString) => {
  console.log(`Message with type: ${clientMessage.type} received`);

  switch (clientMessage.type) {
    case RequestResponseTypes.Registration: {
      registration(ws, clientMessage, key);
      break;
    }

    case RequestResponseTypes.CreateRoom: {
      createRoom();
      break;
    }

    case RequestResponseTypes.AddUserToRoom: {
      addUserToRoom(key, clientMessage);
      break;
    }

    case RequestResponseTypes.StartGame: {
      break;
    }

    case RequestResponseTypes.UpdateWinners: {
      break;
    }

    case RequestResponseTypes.Attack: {
      break;
    }

    case RequestResponseTypes.Turn: {
      break;
    }

    case RequestResponseTypes.UpdateRoom: {
      break;
    }

    case RequestResponseTypes.Finish: {
      break;
    }
    default: {
      console.log('This command is unknown!');
    }
  }
};
