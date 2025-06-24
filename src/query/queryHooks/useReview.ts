import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getReviewReviewsReviewIdGet } from '@/api';

export const getReviewQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['review', id],
    queryFn: () =>
      dataExtractionWrapper(
        getReviewReviewsReviewIdGet({
          path: {
            review_id: id,
          },
        })
      ),
  });

export const useReview = (id: number) => {
  const { data: review, ...rest } = useQuery(getReviewQueryOptions(id));

  return { review, ...rest };
};
