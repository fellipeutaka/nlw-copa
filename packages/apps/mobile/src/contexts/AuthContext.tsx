import { createContext, useState, ReactNode, useEffect } from "react";

import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

interface User {
  name: string;
  avatarUrl: string;
}

interface AuthContextProps {
  user: User | null;
  handleSignIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

const clientId = process.env.GOOGLE_CLIENT_ID;
const iosClientId = process.env.GOOGLE_IOS_CLIENT_ID;
const androidClientId = process.env.GOOGLE_ANDROID_CLIENT_ID;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId,
    iosClientId,
    androidClientId,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["email", "profile"],
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      console.log(response);
    }
  }, [response]);

  async function handleSignIn() {
    try {
      await promptAsync();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}
