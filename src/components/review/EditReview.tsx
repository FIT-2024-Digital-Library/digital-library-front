import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { ReviewForm } from './ReviewForm';
import { useReviewUpdate } from '@/query/mutationHooks';
import { useReview } from '@/query/queryHooks';
import { LoadableComponent } from '../library';

export interface AddReviewProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  reviewId: number;
  setIsEdit: (value: boolean) => void;
}

export const EditReview: React.FC<AddReviewProps> = ({
  reviewId,
  setIsEdit,
}) => {
  const { review, isPending } = useReview(reviewId);
  const { updateReview } = useReviewUpdate(reviewId, () => {
    setIsEdit(false);
  });

  return (
    <LoadableComponent isPending={isPending}>
      {review && <ReviewForm review={review} submitAction={updateReview} />}
    </LoadableComponent>
  );
};
