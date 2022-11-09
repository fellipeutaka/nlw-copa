import { View, Text } from "react-native";

import { colors } from "@nlw-copa/tailwind-config";
import { getName } from "country-list";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { X, Check } from "phosphor-react-native";

import * as Button from "./Button";
import { Team } from "./Team";

type GuessProps = {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamScore: number;
  secondTeamScore: number;
};

export type GameProps = {
  id: string;
  date: Date;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: GuessProps | null;
};

type Props = {
  data: GameProps;
  onGuessConfirm: () => void;
  firstTeamScore: string;
  setFirstTeamScore: (value: string) => void;
  secondTeamScore: string;
  setSecondTeamScore: (value: string) => void;
};

export function Game({
  data,
  firstTeamScore,
  setFirstTeamScore,
  secondTeamScore,
  setSecondTeamScore,
  onGuessConfirm,
}: Props) {
  const when = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY");

  return (
    <View className="w-full items-center bg-zinc-800 border-b-2 border-b-amber-300 mb-3 p-4 rounded">
      <Text className="text-gray-100 font-bold">
        {getName(data.firstTeamCountryCode)} vs{" "}
        {getName(data.secondTeamCountryCode)}
      </Text>
      <Text className="text-gray-200">{when}</Text>
      <View className="flex-row w-full justify-between items-center mt-4">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          value={firstTeamScore}
          onChangeText={setFirstTeamScore}
        />
        <X color={colors.zinc[300]} size={24} />
        <Team
          code={data.secondTeamCountryCode}
          position="left"
          value={secondTeamScore}
          onChangeText={setSecondTeamScore}
        />
      </View>
      {!data.guess && (
        <Button.Root
          className="bg-green-600 h-10 mt-4"
          onPress={onGuessConfirm}
        >
          <View className="flex-row items-center">
            <Text className="text-white font-bold mr-2 uppercase">
              Confirmar palpite
            </Text>
            <Check color={colors.white} size={20} weight="bold" />
          </View>
        </Button.Root>
      )}
    </View>
  );
}
