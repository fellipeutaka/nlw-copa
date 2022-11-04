import { useState, useRef } from "react";
import { Text, View, TextInput } from "react-native";

import Logo from "@nlw-copa/assets/logo.svg";
import { Button } from "@nlw-copa/components/Button";
import { KeyboardAvoidingView } from "@nlw-copa/components/KeyboardAvoidingView";
import { colors } from "@nlw-copa/tailwind-config";

export function New() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<TextInput>(null);

  async function handleCreatePool() {
    if (!title.trim()) {
      inputRef.current?.focus();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 bg-zinc-900 px-5 py-8">
        <Logo width={133} height={24} className="self-center" />
        <Text className="text-2xl font-bold text-white text-center my-8">
          Crie seu próprio bolão da copa{"\n"}e compartilhe entre amigos!
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          ref={inputRef}
          placeholder="Qual nome do seu bolão?"
          placeholderTextColor={colors.zinc[500]}
          className="bg-zinc-800 text-white py-3 px-6 border border-zinc-500 rounded w-full focus:border-amber-300"
        />
        <Button
          className="bg-amber-300 mt-2"
          onPress={handleCreatePool}
          isLoading={isLoading}
        >
          <Text className="text-black uppercase font-bold">
            Criar meu bolão
          </Text>
        </Button>
        <Text className="text-zinc-500 text-center text-sm mt-4">
          Após criar seu bolão, você receberá um{"\n"}
          código único que poderá usar para convidar{"\n"}
          outras pessoas.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
