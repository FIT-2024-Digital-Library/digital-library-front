import { Book, updateBookBooksBookIdUpdatePut } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { BookEditData } from '@/components/book/BookFormSchema';
import { getBookQueryOptions } from '../queryHooks';

export const useBookUpdate = (
  bookId: number,
  onSuccess?: (book: Book) => void
) => {
  const queryClient = useQueryClient();
  const { mutate: updateBook, ...rest } = useMutation({
    mutationFn: (book: BookEditData) =>
      dataExtractionWrapper(
        updateBookBooksBookIdUpdatePut({
          path: {
            book_id: bookId,
          },
          body: {
            ...book,
            themeId: book.theme.value,
            author: book.author.value,
            genre: book.genre?.value,
          },
        })
      ),
    onSuccess: (response) => {
      queryClient.setQueryData(
        getBookQueryOptions(response.id).queryKey,
        response
      );
      onSuccess?.(response);
    },
  });

  return { updateBook, ...rest };
};
