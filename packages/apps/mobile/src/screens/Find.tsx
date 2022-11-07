import { Text, View } from "react-native";

import { TextField } from "@nlw-copa/components/TextField";

export function Find() {
  return (
    <View className="flex-1 items-center pt-8 px-5 bg-zinc-900">
      <Text className="mb-8">
        Encontre um bolão através de{"\n"}
        seu código único
      </Text>
      <TextField
        className="mb-2"
        placeholder="Qual o código do bolão?"
        autoCapitalize="characters"
      />
    </View>
  );
}
