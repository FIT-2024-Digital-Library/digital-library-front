import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Options } from 'react-select';

import { Button } from '@/components/library/Button';
import { BookDisplay } from '@/components/book/BookDisplay';
import { BookEdit } from '@/components/book/BookEdit';
import { Icon } from '../components/library/Icon';
import { ReviewsList } from '../components/review/ReviewsList';
import { useBook } from '@/query/queryHooks/useBook';

export type SelectOption = {
  value: number;
  label: string;
};

export const BookPage: React.FC = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);

  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      <>
        {!isEdit ? (
          <BookDisplay bookId={Number(id)} />
        ) : (
          <BookEdit bookId={Number(id)} />
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
              <Button className="mx-1 py-2 text-xl" variant="plate-black">
                <span>Delete</span>
                <Icon icon="trash" />
              </Button>
            </div>
          </div>
        )}
        <hr className="border-2 border-1-7 my-3 rounded" />
        <ReviewsList bookId={Number(id)} />
      </>
    </div>
  );
};
