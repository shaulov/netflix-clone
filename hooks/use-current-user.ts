import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { ApiRoute } from '@/const';

function useCurrentUser () {
  const { data, error, isLoading, mutate } = useSWR(ApiRoute.Current, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useCurrentUser;