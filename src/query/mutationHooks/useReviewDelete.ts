import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import {
  getReviewsQueryOptions,
  getReviewQueryOptions,
} from '@/query/queryHooks';
import { deleteReviewReviewsReviewIdDeleteDelete, Review } from '@/api';

export const useReviewDelete = (
  reviewId: number,
  onSuccess?: (response: Review) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: deleteReview, ...rest } = useMutation({
    mutationFn: () =>
      dataExtractionWrapper(
        deleteReviewReviewsReviewIdDeleteDelete({
          path: {
            review_id: reviewId,
          },
        })
      ),
    onSuccess: (deleted) => {
      queryClient.invalidateQueries({
        queryKey: getReviewsQueryOptions({ bookId: deleted.bookId }).queryKey,
      });
      queryClient.resetQueries({
        queryKey: getReviewQueryOptions(deleted.id).queryKey,
      });
      onSuccess?.(deleted);
    },
  });

  return { deleteReview, ...rest };
};
