import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { contextSearchComplexSearchContextGet } from '@/api';

export const getBooksSematicQueryOptions = (term: string) =>
  queryOptions({
    queryKey: ['books', 'semantic', term],
    queryFn: () =>
      dataExtractionWrapper(
        contextSearchComplexSearchContextGet({
          query: {
            query: term,
          },
        })
      ),
  });

export const useBooksSemantic = (term: string) => {
  const { data: booksIds, ...rest } = useQuery(
    getBooksSematicQueryOptions(term)
  );

  return { booksIds, ...rest };
};
