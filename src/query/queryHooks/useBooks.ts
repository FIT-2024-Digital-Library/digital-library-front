import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getBooksBooksGet, GetBooksBooksGetData } from '@/api';

export type BooksSearchParams = GetBooksBooksGetData['query'];

export const getBooksQueryOptions = (params: BooksSearchParams = {}) =>
  queryOptions({
    queryKey: ['books', params],
    queryFn: () =>
      dataExtractionWrapper(
        getBooksBooksGet({
          query: params,
        })
      ),
  });

export const useBooks = (params: BooksSearchParams = {}) => {
  const { data: booksIds, ...rest } = useQuery(getBooksQueryOptions(params));

  return { booksIds, ...rest };
};
