import React, { HTMLAttributes, PropsWithChildren, useState } from 'react';
import { ReviewType } from './ReviewsList';
import { Review } from './Review';
import { Button } from '../library/Button';
import { ReviewForm } from './ReviewForm';

export interface MyReviewProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  review?: ReviewType;
}

export const MyReview: React.FC<MyReviewProps> = ({ review }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-y-1">
      {!review && <h2 className="text-center text-xl">Share your opinion!</h2>}
      {review && !isEdit && (
        <>
          <h2 className="text-center text-xl">Your review</h2>
          <Review review={review} />
          <Button variant="plate-black" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </>
      )}
      {(!review || isEdit) && <ReviewForm review={review} />}
    </div>
  );
};
