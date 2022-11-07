import { ReactNode } from "react";

export interface IUserProps {
  name: string;
  avatarUrl: string;
};

export interface IAuthContextDataProps {
  user: IUserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}

export interface IAuthContextProviderProps {
  children: ReactNode;
}
