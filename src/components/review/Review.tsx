import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useProfile, useReview } from '@/query/queryHooks';
import { Button, LoadableComponent, ProgressBar } from '@/components/library';
import { SuspendedUser } from '@/components/user/SuspendedUser';
import { useReviewDelete } from '@/query/mutationHooks';

export interface ReviewProps extends HTMLAttributes<React.FC> {
  reviewId: number;
  setIsEdit?: (value: boolean) => void;
}

export const Review: React.FC<ReviewProps> = ({ reviewId, setIsEdit }) => {
  const { review, isPending } = useReview(reviewId);
  const { profile } = useProfile();

  const { deleteReview } = useReviewDelete(reviewId, () => {
    setIsEdit?.(false);
  });

  return (
    <LoadableComponent isPending={isPending} animated>
      <div
        className={clsx(
          'grid grid-cols-1 divide-black divide-y',
          'border border-black rounded-xl'
        )}
      >
        {review && (
          <>
            <div className="grid grid-cols-3 px-4 items-center text-center">
              <ProgressBar value={review.mark} minValue={0} maxValue={5} />
              <SuspendedUser userId={review.ownerId}>
                {(user) => <span>{user.name}</span>}
              </SuspendedUser>
              <span className="text-gray-500/75">{review.lastEditDate}</span>
            </div>
            <div className="col-span-4 p-2 text-center">{review.text}</div>
          </>
        )}
      </div>
      {setIsEdit && review?.ownerId == profile?.id && (
        <div className="around">
          <Button
            variant="plate-black"
            className="py-2 w-1/4"
            onClick={() => setIsEdit(true)}
          >
            Edit review
          </Button>
          <Button
            variant="plate-black"
            className="py-2 w-1/4"
            onClick={() => deleteReview()}
          >
            Delete review
          </Button>
        </div>
      )}
    </LoadableComponent>
  );
};
