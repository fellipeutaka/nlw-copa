import { colors } from "@nlw-copa/tailwind-config";

export const headerOptions = {
  tabBarLabelPosition: "beside-icon",
  tabBarActiveTintColor: colors.amber[300],
  tabBarInactiveTintColor: colors.zinc[400],
  tabBarStyle: {
    height: 84,
    borderTopWidth: 0,
    backgroundColor: colors.zinc[800],
  },
  headerTintColor: "white",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 16,
  },
  headerStyle: {
    backgroundColor: colors.zinc[800],
  },
} as const;
