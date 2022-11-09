import { useState } from "react";
import { FlatList, View } from "react-native";

import { api } from "@nlw-copa/axios-config";
import { useFetch } from "@nlw-copa/hooks/useFetch";
import { useToast } from "@nlw-copa/hooks/useToast";

import { Game, GameProps } from "../components/Game";
import { EmptyPollList } from "./EmptyPollList";
import { Loading } from "./Loading";

type Props = {
  pollId: string;
  code: string;
};

type GamesResponse = {
  games: GameProps[];
};

export function Guesses({ pollId, code }: Props) {
  const { data, error, isLoading } = useFetch<GamesResponse>(
    `/polls/${pollId}/games`
  );
  const [firstTeamScore, setFirstTeamScore] = useState("");
  const [secondTeamScore, setSecondTeamScore] = useState("");
  const toast = useToast();

  if (error) {
    toast("Não foi possível listar os jogos");
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamScore.trim() || !secondTeamScore.trim()) {
        return toast("Informe o placar para palpitar");
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamScore: Number(firstTeamScore),
        secondTeamScore: Number(secondTeamScore),
      });

      toast("Palpite realizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast("Não foi possível enviar o palpite");
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loading size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={data?.games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          firstTeamScore={firstTeamScore}
          setFirstTeamScore={setFirstTeamScore}
          secondTeamScore={secondTeamScore}
          setSecondTeamScore={setSecondTeamScore}
          onGuessConfirm={async () => await handleGuessConfirm(item.id)}
        />
      )}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListEmptyComponent={() => <EmptyPollList code={code} />}
    />
  );
}
