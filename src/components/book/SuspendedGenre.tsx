import { useGenre } from '@/query/queryHooks';
import React from 'react';
import { LoadableComponent } from '../library';
import { Genre } from '@/api';

interface SuspednedGenreProps {
  genreId: number;
  children: (user: Genre) => JSX.Element;
}

export const SuspendedGenre: React.FC<SuspednedGenreProps> = ({
  genreId,
  children,
}) => {
  const { genre, isPending, error } = useGenre(genreId);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      {genre && children(genre)}
    </LoadableComponent>
  );
};
