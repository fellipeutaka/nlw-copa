import { View, Text } from "react-native";

import { Participants } from "./Participants";
import { PollCardPros } from "./PollCard";

type Props = {
  data: PollCardPros;
};

export function PollHeader({ data }: Props) {
  return (
    <View className="flex-row w-full h-20 border-b border-b-zinc-600/50 justify-between items-center mb-3 p-4">
      <View>
        <Text className="text-white font-bold max-w-[176px]">{data.title}</Text>
        <View className="flex-row">
          <Text className="text-zinc-400 text-sm mr-1">Código:</Text>
          <Text className="text-zinc-400 text-sm font-bold">{data.code}</Text>
        </View>
      </View>
      <Participants
        count={data._count?.participants}
        participants={data.participants}
      />
    </View>
  );
}
