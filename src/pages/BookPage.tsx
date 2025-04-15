import React, { useState } from 'react';
import { useLocation, useParams } from 'wouter';

import { Button } from '@/components/library/Button';
import { BookDisplay } from '@/components/book/BookDisplay';
import { BookEdit } from '@/components/book/BookEdit';
import { Icon } from '../components/library/Icon';
import { ReviewsList } from '../components/review/ReviewsList';
import { DropDown } from '../components/library/DropDown';
import { useProfile } from '@/query/queryHooks';
import { useBookDelete } from '@/query/mutationHooks';

interface BookPageParams {
  id: number;
}

export type SelectOption = {
  value: number;
  label: string;
};

export const BookPage: React.FC = () => {
  const { id } = useParams<BookPageParams>();
  const [, setLocation] = useLocation();

  const [isEdit, setIsEdit] = useState(false);
  const { profile } = useProfile();

  const { deleteBook, error: deleteError } = useBookDelete(id, () => {
    setLocation('/books', { replace: true });
  });

  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      {!isEdit ? (
        <BookDisplay bookId={id} />
      ) : (
        <BookEdit bookId={id} setIsEdit={setIsEdit} />
      )}
      {profile && profile.privileges !== 'basic' && !isEdit && (
        <div className="center my-5">
          <div className="grid grid-cols-2 w-1/2">
            <Button
              className="mx-1 py-2 text-xl"
              variant="plate-black"
              onClick={() => setIsEdit(true)}
            >
              <span>Edit</span>
              <Icon icon="editor" />
            </Button>
            <DropDown
              className="w-full"
              buttonComponent={
                <Button className="w-full text-xl" variant="plate-black">
                  <span>Delete</span>
                  <Icon icon="trash" />
                </Button>
              }
            >
              <div className="py-1 px-2 bg-1-9 around border border-black rounded-md">
                <span>Are you sure? This action cannot be cancelled</span>
                <Button
                  className="mx-1 py-2 text-xl"
                  variant="plate-black"
                  onClick={() => deleteBook()}
                >
                  <span>YES!</span>
                  <Icon icon="trash" />
                </Button>
                {deleteError && (
                  <span className="text-red-500">{deleteError.message}</span>
                )}
              </div>
            </DropDown>
          </div>
        </div>
      )}
      <hr className="border-2 border-1-7 my-3 rounded" />
      <ReviewsList bookId={id} />
    </div>
  );
};
