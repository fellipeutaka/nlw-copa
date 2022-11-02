import { api } from "@nlw-copa/axios-config";
import useSWR from "swr";
import type { BareFetcher, PublicConfiguration } from "swr/dist/types";

export function useFetch<Data, Error = any>(
  path: string,
  config?: Partial<PublicConfiguration<Data, Error, BareFetcher<Data>>>
) {
  const { data, error, mutate } = useSWR<Data>(
    path,
    async (url) => {
      const { data } = await api.get(url);
      return data;
    },
    config
  );

  const isLoading = !data && !error;

  return { data, error, mutate, isLoading };
}
