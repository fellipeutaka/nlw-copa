import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { EmptyPollList } from "@nlw-copa/components/EmptyPollList";
import { Guesses } from "@nlw-copa/components/Guesses";
import { Loading } from "@nlw-copa/components/Loading";
import { Option } from "@nlw-copa/components/Option";
import type { PollCardPros } from "@nlw-copa/components/PollCard";
import { PollHeader } from "@nlw-copa/components/PollHeader";
import { useFetch } from "@nlw-copa/hooks/useFetch";
import { useToast } from "@nlw-copa/hooks/useToast";
import type { PollStackParamList } from "@nlw-copa/routes/stacks/Poll.stack";
import { RouteProp, useRoute } from "@react-navigation/native";

type PollResponse = {
  poll: PollCardPros;
};

export function Details() {
  const { params } = useRoute<RouteProp<PollStackParamList, "details">>();
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const { data, error, isLoading } = useFetch<PollResponse>(
    `/polls/${params.id}`
  );
  const toast = useToast();

  if (error) {
    console.error(error);
    toast("Não foi possível carregar os detalhes do bolão");
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-zinc-900">
        <Loading size="large" />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <View className="flex-1 bg-zinc-900">
      {data?.poll._count.participants > 0 ? (
        <View className="flex-1 px-5">
          <PollHeader data={data.poll} />
          <View className="flex-row bg-zinc-800 rounded mb-8 p-1">
            <Option
              title="Seus palpites"
              isSelected={optionSelected === "guesses"}
              onPress={() => setOptionSelected("guesses")}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === "ranking"}
              onPress={() => setOptionSelected("ranking")}
            />
          </View>
          <Guesses pollId={params.id} code={params.code} />
        </View>
      ) : (
        <EmptyPollList code={params.code} />
      )}
    </View>
  );
}
