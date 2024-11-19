import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { Review } from './Review';

export interface ReviewListProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  bookId: number;
}

export type ReviewType = {
  userId: number;
  mark: number;
  creationTime: Date;
  text?: string;
};

const getReviewDraftTemplate = (id: number, mark: number) => {
  return {
    userId: id,
    mark: mark,
    creationTime: new Date(),
    text: "It's ok...",
  };
};

const getReviewsPseudoRequest = async (bookId: number) => {
  return [
    getReviewDraftTemplate(1, 5),
    getReviewDraftTemplate(2, 4),
    getReviewDraftTemplate(3, 3),
    getReviewDraftTemplate(4, 2),
    getReviewDraftTemplate(5, 5),
  ];
};

export const ReviewsList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    getReviewsPseudoRequest(bookId).then((reviews) => {
      setReviews(reviews);
      setAverage(
        reviews.reduce<number>((sum, review) => sum + review.mark, 0) /
          reviews.length
      );
    });
  }, [bookId]);

  return (
    <div className="grid grid-cols-1 gap-y-3">
      <div className="my-3">Review addition</div>
      <div className="my-3 text-xl font-medium">Average mark: {average}/5</div>
      {reviews?.map((review) => (
        <Review review={review} key={review.userId} />
      ))}
    </div>
  );
};
