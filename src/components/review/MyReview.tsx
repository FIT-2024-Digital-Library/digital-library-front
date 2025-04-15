import React, { HTMLAttributes, useState } from 'react';
import { Review } from './Review';
import { Button } from '../library/Button';
import { ReviewForm } from './ReviewForm';
import { useReviewDelete } from '@/query/mutationHooks';

export interface MyReviewProps extends HTMLAttributes<React.FC> {
  reviewId?: number;
  bookId: number;
}

export const MyReview: React.FC<MyReviewProps> = ({ reviewId, bookId }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { deleteReview } = useReviewDelete(reviewId, () => {
    setIsEdit(true);
  });

  return (
    <div className="grid grid-cols-1 gap-y-1 my-3">
      {reviewId ? (
        <h2 className="text-center text-xl">Your review</h2>
      ) : (
        <h2 className="text-center text-xl">Share your opinion!</h2>
      )}
      {reviewId && !isEdit && (
        <>
          <Review reviewId={reviewId} />
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
        </>
      )}
      {(!reviewId || isEdit) && (
        <>
          <ReviewForm
            reviewId={reviewId}
            bookId={bookId}
            setIsEdit={setIsEdit}
          />
        </>
      )}
    </div>
  );
};
