import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getUsersUsersGet } from '@/api';

export const getUsersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () => dataExtractionWrapper(getUsersUsersGet()),
  });

export const useUsers = () => {
  const { data: users, ...rest } = useQuery(getUsersQueryOptions());

  return { users, ...rest };
}; 