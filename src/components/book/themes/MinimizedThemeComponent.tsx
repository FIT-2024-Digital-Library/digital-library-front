import React from 'react';
import { Button } from '@/components/library/Button';
import { Icon } from '@/components/library';
import { BookThemeComponent } from './themes';
import { getFileRealUrl } from '@/query';

export const MinimizedThemeComponent: BookThemeComponent = ({ book }) => {
  return (
    <div className="center">
      <div className="w-1/2">
        <div className="flex justify-left">
          <a className="w-fit mr-2" href={getFileRealUrl(book.pdfQname)}>
            <Button
              className="p-2 font-bold text-xl rounded-lg"
              variant="plate-grey"
            >
              <Icon icon="download" />
            </Button>
          </a>
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
        </div>
        <h2 className="text-xl mb-2">
          Author: <span className="italic">{book.author}</span>
        </h2>
      </div>
    </div>
  );
};
