import React, { HTMLAttributes } from 'react';
import { Review } from './Review';
import { MyReview } from './MyReview';
import { useReviews, useProfile, useBook } from '@/query/queryHooks';
import { LoadableComponent } from '../library/LoadableComponent';

export interface ReviewListProps extends HTMLAttributes<React.FC> {
  bookId: number;
}

export const ReviewsList: React.FC<ReviewListProps> = ({ bookId }) => {
  const { reviewsIds, isPending: isAllReviewsPending } = useReviews({
    bookId,
  });
  const { profile } = useProfile();
  const { reviewsIds: userReviewsIds } = useReviews({
    bookId,
    ownerId: profile?.id,
  });
  const { book } = useBook(bookId);

  return (
    <div className="grid grid-cols-1 gap-y-3 my-3">
      <LoadableComponent isPending={isAllReviewsPending}>
        <div className="my-3 text-center text-2xl font-medium">
          Average mark: {book?.avgMark || 0}/5
        </div>
        {profile && <MyReview reviewId={userReviewsIds?.[0]} bookId={bookId} />}
        <div
          className="grid gap-y-3 gap-x-3 w-full"
          style={{
            gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
          }}
        >
          {reviewsIds?.map((reviewId) => (
            <Review reviewId={reviewId} key={reviewId} />
          ))}
        </div>
      </LoadableComponent>
    </div>
  );
};
