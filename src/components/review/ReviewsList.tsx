import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { Review } from './Review';
import { MyReview } from './MyReview';

export interface ReviewListProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  bookId: number;
}

export type ReviewType = {
  reviewId: number;
  userId: number;
  mark: number;
  creationTime: Date;
  text?: string;
};

const getReviewDraftTemplate = (id: number, mark: number) => {
  return {
    reviewId: id,
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

const getUserPseudoRequest = async () => {
  return {
    userId: 1,
  };
};

export const ReviewsList: React.FC<ReviewListProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [userReview, setUserReview] = useState<ReviewType>();
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    getReviewsPseudoRequest(bookId).then((reviews) => {
      setReviews(reviews);
      setAverage(
        reviews.reduce<number>((sum, review) => sum + review.mark, 0) /
          reviews.length
      );
      getUserPseudoRequest().then((user) =>
        setUserReview(reviews.find((review) => review.userId == user.userId))
      );
    });
  }, [bookId]);

  return (
    <div className="grid grid-cols-1 gap-y-3 my-3">
      <MyReview review={userReview} />
      <div className="text-xl font-medium">Average mark: {average}/5</div>
      <div
        className="grid gap-y-3 gap-x-3 w-full"
        style={{
          gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )',
        }}
      >
        {reviews?.map((review) => (
          <Review review={review} key={review.userId} />
        ))}
      </div>
    </div>
  );
};
