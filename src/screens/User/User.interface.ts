export interface CountParticipants {
  participants: number;
}

export interface IOwnPools {
  id: string;
  title: string;
  _count: CountParticipants;
}

export interface IUserProps {
  participatingAt: string[];
  ownPools: IOwnPools[];
}

export interface IUser {
  user: IUserProps;
}
