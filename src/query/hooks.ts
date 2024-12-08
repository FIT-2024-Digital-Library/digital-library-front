import { getProfileUsersProfileGet } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { dataExtractionWrapper } from './dataExtractor';

export const useProfile = () => {
  const { data: profile, ...rest } = useQuery({
    queryKey: ['profile'],
    queryFn: () => dataExtractionWrapper(getProfileUsersProfileGet()),
  });

  return { profile, ...rest };
};
