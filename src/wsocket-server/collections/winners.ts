import { GameWinnersType } from '../models/winners-type';

export class Winners {
  private winners: GameWinnersType[] = [];

  getWinners = () => this.winners;

  addWinner = (name: string) => {
    const activeWinner = this.winners.find((data) => data.name === name);
    if (!activeWinner) {
      this.winners.push({
        name,
        wins: 1,
      });
    } else {
      activeWinner.wins += 1;
    }
  };
}

export const winners = new Winners();
