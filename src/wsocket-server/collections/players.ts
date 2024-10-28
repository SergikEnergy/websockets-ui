import { PlayerType } from '../models/players-type';
import { randomUUID } from 'crypto';

type GetUserFunction = (name: string, password: string, socketId: string) => PlayerType | undefined;

export class Players {
  private players: PlayerType[] = [];

  getPlayers = (): PlayerType[] => this.players;

  getPlayerByCredentials: GetUserFunction = (name, password, socketId) => {
    const selectedPlayersByName = this.players.filter((player) => player.name === name);
    if (selectedPlayersByName.length > 0) {
      const selectedPlayer = selectedPlayersByName.find((player) => player.password === password);

      if (!selectedPlayer) {
        throw new Error('Invalid credentials! Check your password.');
      }

      return {
        ...selectedPlayer,
        sessionKey: socketId,
      };
    } else {
      const newPlayer = { name, password, sessionKey: socketId, index: randomUUID() };
      this.createPlayer(newPlayer);

      return newPlayer;
    }
  };

  getPlayerBySessionKey = (session: string) => this.players.find((player) => player.sessionKey === session);

  createPlayer = (data: PlayerType) => this.players.push(data);
}

export const players = new Players();
