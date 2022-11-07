import type { AppParamsList } from "@nlw-copa/@types/routes/ParamsList/AppParamsList";
import { New } from "@nlw-copa/screens/New";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlusCircle, SoccerBall } from "phosphor-react-native";

import { headerOptions } from "./headerOptions";
import { PollStack } from "./stacks/Poll.stack";

const { Navigator, Screen } = createBottomTabNavigator<AppParamsList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={headerOptions} initialRouteName="new">
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
        name="polls"
        component={PollStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SoccerBall color={color} size={size} />
          ),
          tabBarLabel: "Meus bolões",
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
