import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getUserByIdUsersUserIdGet } from '@/api';

export const getUserQueryOptions = (id?: number) =>
  queryOptions({
    queryKey: ['user', id],
    queryFn: () =>
      id
        ? dataExtractionWrapper(
            getUserByIdUsersUserIdGet({
              path: {
                user_id: id,
              },
            })
          )
        : null,
  });

export const useUser = (id?: number) => {
  const { data: user, ...rest } = useQuery(getUserQueryOptions(id));

  return { user, ...rest };
};
