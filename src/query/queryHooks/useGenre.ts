import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getGenreGenresGenreIdGet } from '@/api';

export const getGenreQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['genre', id],
    queryFn: () =>
      dataExtractionWrapper(
        getGenreGenresGenreIdGet({
          path: {
            genre_id: id,
          },
        })
      ),
  });

export const useGenre = (id: number) => {
  const { data: genre, ...rest } = useQuery(getGenreQueryOptions(id));

  return { genre, ...rest };
};
