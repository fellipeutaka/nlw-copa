import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";

export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
