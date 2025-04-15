import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { useReviewCreate } from '@/query/mutationHooks/useReviewCreate';
import { ReviewForm, ReviwSchemeType } from './ReviewForm';

export interface AddReviewProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  bookId: number;
  setIsEdit: (value: boolean) => void;
}

const reviewDraft: ReviwSchemeType = {
  mark: 5,
  text: '',
};

export const AddReview: React.FC<AddReviewProps> = ({ bookId, setIsEdit }) => {
  const { createReview } = useReviewCreate(bookId, () => {
    setIsEdit(false);
  });

  return <ReviewForm review={reviewDraft} submitAction={createReview} />;
};
