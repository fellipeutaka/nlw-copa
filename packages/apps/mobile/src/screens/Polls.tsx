import { View, FlatList } from "react-native";

import * as Button from "@nlw-copa/components/Button";
import { EmptyMyPollList } from "@nlw-copa/components/EmptyMyPollList";
import { Loading } from "@nlw-copa/components/Loading";
import { PollCard, PollCardPros } from "@nlw-copa/components/PollCard";
import { useFetch } from "@nlw-copa/hooks/useFetch";
import { useToast } from "@nlw-copa/hooks/useToast";
import { useNavigation } from "@react-navigation/native";
import { MagnifyingGlass } from "phosphor-react-native";

type PollsData = {
  polls: PollCardPros[];
};

export function Polls() {
  const { navigate } = useNavigation();
  const { data, error, isLoading } = useFetch<PollsData>("/polls");
  const toast = useToast();

  if (error) {
    toast("Ocorreu um erro ao buscar pelos seus bolões");
    console.error(error);
  }

  return (
    <View className="flex-1 bg-zinc-900 px-5 py-6">
      <Button.Root onPress={() => navigate("find")}>
        <MagnifyingGlass size={20} weight="bold" />
        <Button.Text className="ml-2">Buscar bolão por código</Button.Text>
      </Button.Root>
      <View className="w-full h-px bg-zinc-600/50 my-4" />
      {isLoading ? (
        <View className="flex-1 justify-center">
          <Loading size="large" />
        </View>
      ) : (
        <FlatList
          data={data?.polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() =>
                navigate("details", {
                  title: item.title,
                  id: item.id,
                  code: item.code,
                })
              }
            />
          )}
          ListEmptyComponent={EmptyMyPollList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}
