import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReviewReviewsCreatePost, Review } from '@/api';
import { dataExtractionWrapper } from '@/query';
import {
  getBookQueryOptions,
  getReviewQueryOptions,
  getReviewsQueryOptions,
} from '@/query/queryHooks';
import { ReviwSchemeType } from '@/components/review/ReviewForm';

export const useReviewCreate = (
  bookId: number,
  onSuccess?: (response: Review) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: createReview, ...rest } = useMutation({
    mutationFn: (data: ReviwSchemeType) =>
      dataExtractionWrapper(
        createReviewReviewsCreatePost({
          body: {
            ...data,
            bookId: bookId,
          },
        })
      ),
    onSuccess: (response: Review) => {
      queryClient.invalidateQueries({
        queryKey: getBookQueryOptions(bookId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getReviewsQueryOptions({ bookId }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getReviewsQueryOptions({ bookId, ownerId: response.ownerId })
          .queryKey,
      });
      queryClient.setQueryData(
        getReviewQueryOptions(response.id).queryKey,
        response
      );
      onSuccess?.(response);
    },
  });

  return { createReview, ...rest };
};
