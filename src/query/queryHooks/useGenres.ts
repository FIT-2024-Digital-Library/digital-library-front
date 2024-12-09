import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getGenresGenresGet } from '@/api';



export const getGenresQueryOptions = () =>
  queryOptions({
    queryKey: ['genres'],
    queryFn: () => dataExtractionWrapper(getGenresGenresGet()),
  });

export const useGenres = () => {
  const { data: genres, ...rest } = useQuery(getGenresQueryOptions());

  return { genres, ...rest };
};
