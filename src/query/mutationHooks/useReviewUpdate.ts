import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Review, updateReviewReviewsReviewIdUpdatePut } from '@/api';
import { dataExtractionWrapper } from '@/query';
import {
  getBookQueryOptions,
  getReviewQueryOptions,
  getReviewsQueryOptions,
} from '@/query/queryHooks';
import { ReviwSchemeType } from '@/components/review/ReviewForm';

export const useReviewUpdate = (
  reviewId: number,
  onSuccess?: (response: Review) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: updateReview, ...rest } = useMutation({
    mutationFn: (review: ReviwSchemeType) =>
      dataExtractionWrapper(
        updateReviewReviewsReviewIdUpdatePut({
          path: {
            review_id: reviewId,
          },
          body: {
            ...review,
          },
        })
      ),
    onSuccess: (response: Review) => {
      queryClient.invalidateQueries({
        queryKey: getBookQueryOptions(response.bookId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getReviewsQueryOptions({ bookId: response.bookId }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getReviewsQueryOptions({
          bookId: response.bookId,
          ownerId: response.ownerId,
        }).queryKey,
      });
      queryClient.setQueryData(
        getReviewQueryOptions(response.id).queryKey,
        response
      );
      onSuccess?.(response);
    },
  });

  return { updateReview, ...rest };
};
