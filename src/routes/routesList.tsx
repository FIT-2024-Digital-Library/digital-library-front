import React from 'react';
import { StartPage, Page1, Page2, Page3 } from '@/pages';

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
    url: '/page1',
    label: 'Page 1',
    content: <Page1 />,
  },
  {
    url: '/page2/:id',
    content: <Page2 />,
  },
  {
    url: '/page3',
    label: 'Page 3',
    content: <Page3 />,
  },
];
