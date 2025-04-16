import { useAuthor } from '@/query/queryHooks';
import React from 'react';
import { LoadableComponent } from '../library';
import { Author } from '@/api';

interface SuspednedAuthorProps {
  authorId: number;
  children: (user: Author) => JSX.Element;
}

export const SuspendedAuthor: React.FC<SuspednedAuthorProps> = ({
  authorId,
  children,
}) => {
  const { author, isPending, error } = useAuthor(authorId);

  return (
    <LoadableComponent isPending={isPending} errorMessage={error?.message}>
      {author && children(author)}
    </LoadableComponent>
  );
};
