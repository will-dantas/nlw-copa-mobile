import { ReactNode } from "react";

export interface IUserProps {
  sub: string;
  name: string;
  avatarUrl: string;
};

export interface IAuthContextDataProps {
  user: IUserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
}

export interface IAuthContextProviderProps {
  children: ReactNode;
}
