import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { colors } from "@nlw-copa/tailwind-config";

export function Loading(props: ActivityIndicatorProps) {
  return <ActivityIndicator color={colors.amber[300]} {...props} />;
}
