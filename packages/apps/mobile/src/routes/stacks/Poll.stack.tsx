import { Find } from "@nlw-copa/screens/Find";
import { Polls } from "@nlw-copa/screens/Polls";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { headerOptions } from "../headerOptions";

const Stack = createNativeStackNavigator();

export function PollStack() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="my-polls"
        component={Polls}
        options={{
          headerTitle: "Meus bolões",
        }}
      />
      <Stack.Screen
        name="find"
        component={Find}
        options={{
          headerTitle: "Buscar por código",
        }}
      />
    </Stack.Navigator>
  );
}
