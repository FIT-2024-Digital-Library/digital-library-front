import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getAuthorsAuthorsGet } from '@/api';

export const getAuthorsQueryOptions = () =>
  queryOptions({
    queryKey: ['genrs'],
    queryFn: () => dataExtractionWrapper(getAuthorsAuthorsGet()),
  });

export const useAuthors = () => {
  const { data: authors, ...rest } = useQuery(getAuthorsQueryOptions());

  return { authors, ...rest };
};
