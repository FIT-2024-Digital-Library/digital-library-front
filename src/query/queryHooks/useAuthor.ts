import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getAuthorAuthorsAuthorIdGet } from '@/api';

export const getAuthorQueryOptions = (id?: number) =>
  queryOptions({
    queryKey: ['author', id],
    queryFn: () =>
      !id
        ? null
        : dataExtractionWrapper(
            getAuthorAuthorsAuthorIdGet({
              path: {
                author_id: id,
              },
            })
          ),
  });

export const useAuthor = (id?: number) => {
  const { data: author, ...rest } = useQuery(getAuthorQueryOptions(id));

  return { author, ...rest };
};
