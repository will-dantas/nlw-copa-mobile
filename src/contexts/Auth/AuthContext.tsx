import { createContext } from "react";
import {
  IAuthContextDataProps,
  IAuthContextProviderProps,
} from "./AuthContext.interface";

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '979668823173-o09oordrev2f1uuhrg4cqdd2ip8nooj0.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function signIn() {
    console.log("vamos lá");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: "William",
          avatarUrl: "https://github.com/will-dantas.png",
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
