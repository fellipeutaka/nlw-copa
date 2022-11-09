import { View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export function EmptyMyPollList() {
  const { navigate } = useNavigation();

  return (
    <View className="items-center">
      <View>
        <Text className="text-zinc-400 text-sm">
          Você ainda não está participando de
        </Text>
      </View>
      <View className="flex-row">
        <Text className="text-zinc-400 text-sm">nenhum bolão, que tal</Text>
        <TouchableOpacity onPress={() => navigate("find")} className="ml-1">
          <Text className="underline text-amber-300">buscar um por código</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <Text className="text-zinc-400 text-sm">ou</Text>
        <TouchableOpacity onPress={() => navigate("new")} className="ml-1">
          <Text className="underline text-amber-300">criar um novo</Text>
        </TouchableOpacity>
        <Text className="text-zinc-400 text-sm">?</Text>
      </View>
    </View>
  );
}
