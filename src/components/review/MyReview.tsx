import React, { HTMLAttributes, useState } from 'react';
import { Review } from './Review';
import { EditReview } from './EditReview';
import { AddReview } from './AddReview';

export interface MyReviewProps extends HTMLAttributes<React.FC> {
  reviewId?: number;
  bookId: number;
}

export const MyReview: React.FC<MyReviewProps> = ({ reviewId, bookId }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-y-1 my-3">
      {reviewId ? (
        <>
          <h2 className="text-center text-xl">Your review</h2>
          {!isEdit ? (
            <Review reviewId={reviewId} setIsEdit={setIsEdit} />
          ) : (
            <EditReview reviewId={reviewId} setIsEdit={setIsEdit} />
          )}
        </>
      ) : (
        <>
          <h2 className="text-center text-xl">Share your opinion!</h2>
          <AddReview bookId={bookId} setIsEdit={setIsEdit} />
        </>
      )}
    </div>
  );
};
