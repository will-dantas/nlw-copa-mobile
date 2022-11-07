import { createContext, useCallback, useEffect, useState } from "react";
import {
  IAuthContextDataProps,
  IAuthContextProviderProps,
  IUserProps,
} from "./AuthContext.interface";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<IUserProps>({} as IUserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '837489444344-6bp9guikj4tftnt3n8h3ag7mkbroc02a.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  const signInWithGoogle = useCallback(async (access_token: string) => {
    try {
      setIsUserLoading(true);


    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response, signInWithGoogle]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
