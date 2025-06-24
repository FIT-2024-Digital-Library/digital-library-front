import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getBookBooksBookIdGet } from '@/api';

export const getBookQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['book', id],
    queryFn: () =>
      dataExtractionWrapper(
        getBookBooksBookIdGet({
          path: {
            book_id: id,
          },
        })
      ),
  });

export const useBook = (id: number) => {
  const { data: book, ...rest } = useQuery(getBookQueryOptions(id));

  return { book, ...rest };
};
