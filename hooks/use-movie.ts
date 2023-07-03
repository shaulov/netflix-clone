import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { ApiRoute } from "@/const";

function useMovie (id?: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `${ApiRoute.MovieList}/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { 
    data, 
    error, 
    isLoading, 
    mutate 
  };
}

export default useMovie;