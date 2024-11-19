import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { ReviewType } from './ReviewsList';
import clsx from 'clsx';

export interface ReviewProps
  extends PropsWithChildren<HTMLAttributes<React.FC>> {
  review: ReviewType;
}

export type UserType = {
  id: number;
  name: string;
};

export const Review: React.FC<ReviewProps> = ({ review }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser({ id: review.userId, name: 'Kirill' });
  }, [review.userId]);

  return (
    <div
      className={clsx(
        'grid grid-cols-5 py-3',
        'border border-black rounded-xl'
      )}
      key={review.userId}
    >
      <div className="grid grid-cols-1 gap-y-3 text-center">
        <span>{review.mark}</span>
        <span>{user?.name}</span>
        <span className="text-gray-500/75">
          {review.creationTime.toLocaleDateString()}
        </span>
      </div>
      {review.text && <div className="col-span-4">{review.text}</div>}
    </div>
  );
};
