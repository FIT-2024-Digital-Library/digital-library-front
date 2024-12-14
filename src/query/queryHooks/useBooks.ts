import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getBooksBooksGet } from '@/api';

export interface BooksSearchParams {
  title?: string;
  author?: string;
  genre?: string;
  published_date?: string;
  description?: string;
  min_rating?: number;
  max_rating?: number;
}

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
  const { data: books, ...rest } = useQuery(getBooksQueryOptions(params));

  return { books, ...rest };
}; 