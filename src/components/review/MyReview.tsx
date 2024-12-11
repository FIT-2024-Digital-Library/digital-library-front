import React, { HTMLAttributes, PropsWithChildren, useState } from 'react';
import { Review } from './Review';
import { Button } from '../library/Button';
import { ReviewForm } from './ReviewForm';

export interface MyReviewProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  reviewId?: number;
}

export const MyReview: React.FC<MyReviewProps> = ({ reviewId }) => {
  const [isEdit, setIsEdit] = useState(false);

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
          <Button variant="plate-black" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </>
      )}
      {(!reviewId || isEdit) && (
        <>
          <ReviewForm reviewId={reviewId} setIsEdit={setIsEdit} />
        </>
      )}
    </div>
  );
};
