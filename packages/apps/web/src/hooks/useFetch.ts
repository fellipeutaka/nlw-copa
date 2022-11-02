import { api } from "@nlw-copa/axios-config";
import useSWR from "swr";

export function useFetch<Data>(path: string) {
  const { data, error, mutate } = useSWR<Data>(path, async (url) => {
    const { data } = await api.get(url);
    return data;
  });

  const isLoading = !data && !error;

  return { data, error, mutate, isLoading };
}
