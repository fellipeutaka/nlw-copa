import { View } from "react-native";
import CountryFlag from "react-native-country-flag";

import { TextField } from "./TextField";

type Props = {
  code: string;
  position: "left" | "right";
  value: string;
  onChangeText: (value: string) => void;
};

export function Team({ code, position, value, onChangeText }: Props) {
  return (
    <View className="flex-row items-center">
      {position === "left" && (
        <CountryFlag isoCode={code} size={24} style={{ marginRight: 12 }} />
      )}
      <TextField
        className="w-10 h-9 text-center text-xs p-0 bg-zinc-900"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
      {position === "right" && (
        <CountryFlag isoCode={code} size={24} style={{ marginLeft: 12 }} />
      )}
    </View>
  );
}
