import React from 'react';
import { StartPage, BooksSearchPage, BookPage, Page3 } from '@/pages';

type RouteData = {
  url: string;
  label?: string;
  content: JSX.Element;
};

export const routesList: RouteData[] = [
  {
    url: '/',
    label: 'Main page',
    content: <StartPage />,
  },
  {
    url: '/books',
    content: <BooksSearchPage />,
  },
  {
    url: '/books/:id',
    content: <BookPage />,
  },
  {
    url: '/page3',
    label: 'Page 3',
    content: <Page3 />,
  },
];
