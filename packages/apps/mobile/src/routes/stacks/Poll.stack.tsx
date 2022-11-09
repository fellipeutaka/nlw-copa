import { TouchableOpacity, Share } from "react-native";

import { Details } from "@nlw-copa/screens/Details";
import { Find } from "@nlw-copa/screens/Find";
import { Polls } from "@nlw-copa/screens/Polls";
import { truncate } from "@nlw-copa/utils/truncate";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Export } from "phosphor-react-native";

import { headerOptions } from "../headerOptions";

export type PollStackParamList = {
  "my-polls": undefined;
  find: undefined;
  details: {
    id: string;
    title: string;
    code: string;
  };
};

const Stack = createNativeStackNavigator<PollStackParamList>();

export function PollStack() {
  async function handleCodeShare(code: string) {
    await Share.share({
      message: code,
    });
  }

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
      <Stack.Screen
        name="details"
        component={Details}
        options={({ route }) => ({
          headerTitle: truncate(route.params.title, 26),
          headerRight: ({ tintColor }) => (
            <TouchableOpacity
              onPress={async () => await handleCodeShare(route.params.code)}
            >
              <Export color={tintColor} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
