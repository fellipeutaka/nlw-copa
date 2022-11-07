import { Text, View } from "react-native";

import * as Button from "@nlw-copa/components/Button";
import { useNavigation } from "@react-navigation/native";
import { MagnifyingGlass } from "phosphor-react-native";

export function NoResults() {
  return (
    <Text className="text-zinc-400 text-sm text-center">
      Você ainda não está participando de{"\n"}
      nenhum bolão, que tal{" "}
      <Text className="underline text-amber-300">buscar um por código</Text>
      {"\n"}
      ou <Text className="underline text-amber-300">criar um novo</Text>?
    </Text>
  );
}

export function Polls() {
  const navigation = useNavigation();

  function handleNavigateToFind() {
    navigation.navigate("find");
  }

  return (
    <View className="flex-1 bg-zinc-900 px-5 py-6">
      <Button.Root onPress={handleNavigateToFind}>
        <MagnifyingGlass size={20} weight="bold" />
        <Button.Text className="ml-2">Buscar bolão por código</Button.Text>
      </Button.Root>
      <View className="w-full h-px bg-zinc-600/50 my-4" />
      <NoResults />
    </View>
  );
}
