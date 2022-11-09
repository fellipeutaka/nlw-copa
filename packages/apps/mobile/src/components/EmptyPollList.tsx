import { View, Text, TouchableOpacity, Share } from "react-native";

type Props = {
  code: string;
};

export function EmptyPollList({ code }: Props) {
  async function handleCodeShare() {
    await Share.share({
      message: code,
    });
  }

  return (
    <View className="flex-row flex-wrap justify-center p-4">
      <Text className="text-gray-400">
        Esse bolão ainda não tem participantes, que tal
      </Text>
      <TouchableOpacity onPress={handleCodeShare}>
        <Text className="text-amber-300 underline">compartilhar o código</Text>
      </TouchableOpacity>
      <Text className="text-gray-400 mx-1">do bolão com alguém?</Text>
      <Text className="text-gray-400 mr-1">Use o código</Text>
      <Text className="text-gray-400 text-center font-bold">{code}</Text>
    </View>
  );
}
