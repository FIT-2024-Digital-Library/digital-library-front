import React from 'react';
import { StartPage, BooksSearchPage, BookPage, AddBookPage, UsersManagementPage } from '@/pages';

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
    url: '/books/add',
    content: <AddBookPage />,
  },
  {
    url: '/books/:id',
    content: <BookPage />,
  },
  {
    url: '/users/manage',
    content: <UsersManagementPage />,
  },
];
