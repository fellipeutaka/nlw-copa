import { SignIn } from "@nlw-copa/screens/SignIn";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./App.routes";

export function Routes() {
  const isAuthenticated = !false;

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
