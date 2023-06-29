import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { ApiRoute } from '@/const';

function useFavorites () {
  const { data, error, isLoading, mutate } = useSWR(ApiRoute.Favorites, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data, 
    error, 
    isLoading, 
    mutate
  }
}

export default useFavorites;