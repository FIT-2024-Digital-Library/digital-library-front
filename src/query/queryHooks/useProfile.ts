import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getProfileUsersProfileGet } from '@/api';

export const getProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['profile'],
    queryFn: () => dataExtractionWrapper(getProfileUsersProfileGet()),
  });

export const useProfile = () => {
  const { data: profile, ...rest } = useQuery(getProfileQueryOptions());

  return { profile, ...rest };
};
