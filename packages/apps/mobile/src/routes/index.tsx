import { useAuth } from "@nlw-copa/hooks/useAuth";
import { SignIn } from "@nlw-copa/screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./App.routes";

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
