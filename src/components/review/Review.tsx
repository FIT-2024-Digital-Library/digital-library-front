import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { ProgressBar } from '../library/ProgressBar';
import { useReview } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';

export interface ReviewProps extends HTMLAttributes<React.FC> {
  reviewId: number;
}

export const Review: React.FC<ReviewProps> = ({ reviewId }) => {
  const { review, isPending } = useReview(reviewId);

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
              <span>{review.ownerId}</span>
              <span className="text-gray-500/75">{review.lastEditDate}</span>
            </div>
            <div className="col-span-4 p-2 text-center">{review.text}</div>
          </>
        )}
      </div>
    </LoadableComponent>
  );
};
