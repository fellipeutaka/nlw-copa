import { useState, useRef } from "react";
import { Text, View, TextInput } from "react-native";

import Logo from "@nlw-copa/assets/logo.svg";
import { api } from "@nlw-copa/axios-config";
import * as Button from "@nlw-copa/components/Button";
import { KeyboardAvoidingView } from "@nlw-copa/components/KeyboardAvoidingView";
import { TextField } from "@nlw-copa/components/TextField";
import { useToast } from "@nlw-copa/hooks/useToast";

export function New() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<TextInput>(null);
  const toast = useToast();

  async function handleCreatePoll() {
    if (!title.trim()) {
      toast("Por favor, informe o nome do bolão");
      return inputRef.current?.focus();
    }
    setIsLoading(true);
    try {
      await api.post("/polls", { title: title.trim() });
      setTitle("");
      toast("Bolão criado com sucesso");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 bg-zinc-900 px-5 py-8">
        <Logo width={133} height={24} className="self-center" />
        <Text className="text-2xl font-bold text-white text-center my-8">
          Crie seu próprio bolão da copa{"\n"}e compartilhe entre amigos!
        </Text>
        <TextField
          value={title}
          onChangeText={setTitle}
          ref={inputRef}
          placeholder="Qual nome do seu bolão?"
        />
        <Button.Root
          className="mt-2"
          onPress={handleCreatePoll}
          isLoading={isLoading}
        >
          <Button.Text>Criar meu bolão</Button.Text>
        </Button.Root>
        <Text className="text-zinc-500 text-center text-sm mt-4">
          Após criar seu bolão, você receberá um{"\n"}
          código único que poderá usar para convidar{"\n"}
          outras pessoas.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
