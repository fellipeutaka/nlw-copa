import { useState, useRef } from "react";
import { Text, View, TextInput } from "react-native";

import { api } from "@nlw-copa/axios-config";
import * as Button from "@nlw-copa/components/Button";
import { KeyboardAvoidingView } from "@nlw-copa/components/KeyboardAvoidingView";
import { TextField } from "@nlw-copa/components/TextField";
import { useToast } from "@nlw-copa/hooks/useToast";
import { useNavigation } from "@react-navigation/native";

export type ApiResponseError = {
  response?: {
    data?: {
      message?: "Poll not found" | "You already joined this poll";
    };
  };
};

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { goBack } = useNavigation();
  const toast = useToast();

  async function handleJoinPoll() {
    if (!code.trim()) {
      toast("Por favor, informe o código");
      return inputRef.current?.focus();
    }
    setIsLoading(true);
    try {
      await api.post("/polls/join", { code });
      toast("Você entrou no bolão com sucesso");
      goBack();
    } catch (err: any | ApiResponseError) {
      console.error(err);
      setIsLoading(false);
      if (err.response?.data?.message === "Poll not found") {
        return toast("Não foi possível encontrar o bolão");
      }
      if (err.response?.data?.message === "You already joined this poll") {
        return toast("Você já está nesse bolão");
      }
      toast("Ocorreu um erro ao tentar se juntar ao bolão");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 items-center pt-8 px-5 bg-zinc-900">
        <Text className="text-white text-center text-2xl font-bold mb-8">
          Encontre um bolão através de{"\n"}
          seu código único
        </Text>
        <TextField
          className="mb-2"
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          ref={inputRef}
          value={code}
          onChangeText={setCode}
        />
        <Button.Root isLoading={isLoading} onPress={handleJoinPoll}>
          <Button.Text>Buscar bolão</Button.Text>
        </Button.Root>
      </View>
    </KeyboardAvoidingView>
  );
}
