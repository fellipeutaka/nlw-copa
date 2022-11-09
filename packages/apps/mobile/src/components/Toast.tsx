import { View, Text } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

export function Toast({ text1 }: ToastConfigParams<any>) {
  return (
    <View className="bg-neutral-900 shadow-xl shadow-black/50 flex-row justify-center w-4/5 px-3 py-3.5 rounded-full">
      <Text className="text-neutral-100 font-bold">{text1}</Text>
    </View>
  );
}
