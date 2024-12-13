import { Book } from '@/api';
import React, { HTMLAttributes } from 'react';
import { DefaultThemeComponent } from './DefaultThemeComponent';

export interface BookThemeComponentProps extends HTMLAttributes<React.FC> {
  book: Book;
}
export type BookThemeComponent = React.FC<BookThemeComponentProps>;

export type Theme = {
  id: number;
  name: string;
  getComponent: (book: Book) => JSX.Element;
};

export const defaultTheme: Theme = {
  id: 0,
  name: 'Default',
  getComponent: (book: Book) => <DefaultThemeComponent book={book} />,
};

export const themes: Theme[] = [
  defaultTheme,
  // {
  //   id: 1,
  //   name: 'Without cover',
  //   component:
  // },
  // {
  //   id: 2,
  //   name: 'Minimized (only required fields)',
  //   component:
  // },
  // {
  //   id: 3,
  //   name: 'Composed',
  //   component:
  // },
];

export const getTheme = (id: number) =>
  themes.find((theme) => theme.id === id) ?? defaultTheme;
