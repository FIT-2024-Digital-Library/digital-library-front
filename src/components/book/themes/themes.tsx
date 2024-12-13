import { Book } from '@/api';
import React, { HTMLAttributes } from 'react';
import { DefaultThemeComponent } from './DefaultThemeComponent';
import { WithoutCoverThemeComponennt } from './WithoutCoverThemeComponent copy';
import { MinimizedThemeComponent } from './MinimizedThemeComponent';
import { ComposedThemeComponent } from './ComposedThemeComponent';

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
  getComponent: (book) => <DefaultThemeComponent book={book} />,
};

export const themes: Theme[] = [
  defaultTheme,
  {
    id: 1,
    name: 'Without cover',
    getComponent: (book) => <WithoutCoverThemeComponennt book={book} />,
  },
  {
    id: 2,
    name: 'Minimized (only required fields)',
    getComponent: (book) => <MinimizedThemeComponent book={book} />,
  },
  {
    id: 3,
    name: 'Composed',
    getComponent: (book) => <ComposedThemeComponent book={book} />,
  },
];

export const getTheme = (id: number) =>
  themes.find((theme) => theme.id === id) ?? defaultTheme;
