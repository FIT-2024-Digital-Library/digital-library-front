import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { contextSearchComplexSearchContextGet } from '@/api';

export const getBooksContextQueryOptions = (term: string) =>
  queryOptions({
    queryKey: ['books', 'context', term],
    queryFn: () =>
      dataExtractionWrapper(
        contextSearchComplexSearchContextGet({
          query: {
            query: term,
          },
        })
      ),
  });

export const useBooksContext = (term: string) => {
  const { data: booksIds, ...rest } = useQuery(
    getBooksContextQueryOptions(term)
  );

  return { booksIds, ...rest };
};
