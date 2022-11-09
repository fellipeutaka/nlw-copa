import { View, Text, Image } from "react-native";

export type ParticipantProps = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type Props = {
  participants: ParticipantProps[];
  count: number;
};

export function Participants({ participants, count }: Props) {
  return (
    <View className="flex-row">
      {participants
        ? participants.map((participant) => (
            <Image
              key={participant.id}
              source={{ uri: participant.user.avatarUrl }}
              className="w-8 h-8 rounded-full -mr-3"
            />
          ))
        : null}
      <View className="w-8 h-8 bg-zinc-700 rounded-full items-center justify-center">
        <Text className="text-zinc-100 text-xs font-medium">
          {count ? `+${count}` : 0}
        </Text>
      </View>
    </View>
  );
}
