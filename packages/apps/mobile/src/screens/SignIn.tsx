import { View, Text } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import Logo from "@nlw-copa/assets/logo.svg";
import * as Button from "@nlw-copa/components/Button";
import { useAuth } from "@nlw-copa/hooks/useAuth";

export function SignIn() {
  const { handleSignIn } = useAuth();

  return (
    <View className="flex-1 justify-center bg-zinc-900 p-7">
      <Logo width={212} height={40} className="self-center" />
      <Button.Root className="bg-[#DB4437] mt-12" onPress={handleSignIn}>
        <Fontisto name="google" color="white" size={20} />
        <Button.Text className="text-white ml-3">Entrar com Google</Button.Text>
      </Button.Root>
      <Text className="text-zinc-400 text-sm font-semibold text-center mt-4">
        Não utilizamos nenhuma informação além{"\n"}
        do seu e-mail para criação de sua conta.
      </Text>
    </View>
  );
}
