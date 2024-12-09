import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Options } from 'react-select';

import { Button } from '@/components/library/Button';
import { BookDisplay } from '@/components/book/BookDisplay';
import { BookEdit } from '@/components/book/BookEdit';
import { Icon } from '../components/library/Icon';
import { ReviewsList } from '../components/review/ReviewsList';
import { useBook } from '@/query/queryHooks/useBook';
import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { deleteBookBooksBookIdDeleteDelete } from '@/api';
import { navigate } from 'wouter/use-browser-location';
import { DropDown } from '../components/library/DropDown';

export type SelectOption = {
  value: number;
  label: string;
};

export const BookPage: React.FC = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  const { mutate: deleteBook, error: deleteError } = useMutation({
    mutationFn: (id: number) =>
      dataExtractionWrapper(
        deleteBookBooksBookIdDeleteDelete({
          path: { book_id: id },
        })
      ),
    onSuccess: () => {
      navigate('/books', { replace: true });
    },
  });

  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      <>
        {!isEdit ? (
          <BookDisplay bookId={Number(id)} />
        ) : (
          <BookEdit bookId={Number(id)} setIsEdit={setIsEdit} />
        )}
        {canEdit && !isEdit && (
          <div className="grid grid-cols-3 my-2">
            <div className="grid grid-cols-2">
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
                    onClick={() => deleteBook(Number(id))}
                  >
                    <span>YES!</span>
                    <Icon icon="trash" />
                  </Button>
                </div>
              </DropDown>
            </div>
          </div>
        )}
        <hr className="border-2 border-1-7 my-3 rounded" />
        <ReviewsList bookId={Number(id)} />
      </>
    </div>
  );
};
