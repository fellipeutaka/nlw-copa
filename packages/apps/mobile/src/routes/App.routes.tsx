import { SignIn } from "@nlw-copa/screens/SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export function App() {
  return (
    <Navigator initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
