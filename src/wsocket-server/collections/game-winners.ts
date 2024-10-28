import { GameWinnersType } from '../models/winners-type';

export class GameWinners {
  private gameWinners: GameWinnersType[] = [];

  getAllWinners = () => this.gameWinners;

  addWinner = (winner: string) => {
    const foundWinner = this.findWinnerByName(winner);
    if (foundWinner) {
      foundWinner.wins += 1;
    } else {
      this.gameWinners.push({
        name: winner,
        wins: 1,
      });
    }
  };

  findWinnerByName = (name: string) => this.gameWinners.find((player) => player.name === name);
}

export const gameWinners = new GameWinners();
