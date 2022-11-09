import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./contexts/AuthContext";
import { toastConfig } from "./lib/toast";
import { Routes } from "./routes";

export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" translucent animated />
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <Toast config={toastConfig} position="top" type="message" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
