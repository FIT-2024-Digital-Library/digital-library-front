import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { Book, createBookBooksCreatePost } from '@/api';
import { BookEditData } from '@/components/book/BookForm';
import { getBookQueryOptions } from '../queryHooks';

export const useBookCreate = (onSuccess?: (book: Book) => void) => {
  const queryClient = useQueryClient();
  const { mutate: createBook, ...rest } = useMutation({
    mutationFn: (book: BookEditData) =>
      dataExtractionWrapper(
        createBookBooksCreatePost({
          body: {
            ...book,
            imageQname: book.imageQname !== null ? book.imageQname : undefined,
            themeId: book.theme.value,
            author: book.author.value,
            genre: book.genre?.value,
          },
        })
      ),
    onSuccess: (book: Book) => {
      queryClient.setQueryData(getBookQueryOptions(book.id).queryKey, book);
      onSuccess?.(book);
    },
  });

  return { createBook, ...rest };
};
