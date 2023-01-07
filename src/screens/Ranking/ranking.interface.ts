export interface IUserGuess {
  user: {
    avatarUrl: string,
    name: string,
  }      
}

export interface IGuesses {
  id: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  participantId: string;
  gameId: string;
  participant: IUserGuess;
}

export interface IGame {
  id: string;
  golHome: number;
  golAway: number;
  guesses: IGuesses[];
}

export interface IDataGuesses {
    data: IGuesses[]
}