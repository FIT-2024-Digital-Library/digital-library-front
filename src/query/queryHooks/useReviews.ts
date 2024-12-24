import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getReviewsReviewsGet, GetReviewsReviewsGetData } from '@/api';

export const getReviewsQueryOptions = (
  query?: GetReviewsReviewsGetData['query']
) =>
  queryOptions({
    queryKey: ['reviews', query?.bookId, query?.ownerId],
    queryFn: () =>
      dataExtractionWrapper(
        getReviewsReviewsGet({
          query: query,
        })
      ),
  });

export const useReviews = (query?: GetReviewsReviewsGetData['query']) => {
  const { data: reviewsIds, ...rest } = useQuery(getReviewsQueryOptions(query));

  return { reviewsIds, ...rest };
};
