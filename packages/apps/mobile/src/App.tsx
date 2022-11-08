import { AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { SWRConfig } from "swr";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes } from "./routes";

export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent />
        <SWRConfig
          value={{
            initFocus(callback) {
              let appState = AppState.currentState;
              const subscription = AppState.addEventListener(
                "change",
                (nextAppState) => {
                  if (
                    appState.match(/inactive|background/) &&
                    nextAppState === "active"
                  ) {
                    callback();
                  }
                  appState = nextAppState;
                }
              );
              return () => {
                subscription.remove();
              };
            },
          }}
        >
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SWRConfig>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
