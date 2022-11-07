import { createContext, useState, ReactNode, useEffect } from "react";

import { api } from "@nlw-copa/axios-config";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

type User = {
  name: string;
  avatarUrl: string;
};

type AuthContextProps = {
  user: User | null;
  handleSignIn: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode;
};

type TokenResponse = {
  token: string;
};

const clientId = process.env.GOOGLE_CLIENT_ID;
const iosClientId = process.env.GOOGLE_IOS_CLIENT_ID;
const androidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID;

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    iosClientId,
    androidClientId,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["email", "profile"],
  });

  async function handleSignIn() {
    try {
      setIsLoading(true);
      await promptAsync();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsLoading(true);
      const tokenResponse = await api.post<TokenResponse>("/users", {
        access_token,
      });
      const userInfoResponse = await api.get("/me", {
        headers: { Authorization: `Bearer ${tokenResponse.data.token}` },
      });
      console.log(userInfoResponse.data);
      // setUser(userInfoResponse.data)
    } catch (err) {
      console.log(err);

      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      void signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{ user, handleSignIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
