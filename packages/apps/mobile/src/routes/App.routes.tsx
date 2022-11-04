import { New } from "@nlw-copa/screens/New";
import { Pools } from "@nlw-copa/screens/Pools";
import { colors } from "@nlw-copa/tailwind-config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
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
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PlusCircle color={color} size={size} />
          ),
          tabBarLabel: "Novo bolão",
          headerTitle: "Criar novo bolão",
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SoccerBall color={color} size={size} />
          ),
          tabBarLabel: "Meus bolões",
          headerTitle: "Meus bolões",
        }}
      />
    </Navigator>
  );
}
