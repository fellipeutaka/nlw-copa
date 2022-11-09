import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { ParticipantProps, Participants } from "./Participants";

export type PollCardPros = {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  };
  participants: ParticipantProps[];
  _count: {
    participants: number;
  };
};

type Props = {
  data: PollCardPros;
} & TouchableOpacityProps;

export function PollCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className="w-full h-20 bg-zinc-800 border-b-2 border-b-amber-300 flex-row justify-between items-center rounded mb-3 p-4">
        <View>
          <Text className="text-white font-bold max-w-[176px]">
            {data.title}
          </Text>
          <Text className="text-zinc-400 text-xs">
            Criado por {data.owner.name}
          </Text>
        </View>
        <Participants
          count={data._count.participants}
          participants={data.participants}
        />
      </View>
    </TouchableOpacity>
  );
}
