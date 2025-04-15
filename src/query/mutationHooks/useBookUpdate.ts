import { Book, updateBookBooksBookIdUpdatePut } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { BookEditData } from '@/components/book/BookEdit';

export const useBookUpdate = (
  bookId: number,
  onSuccess?: (book: Book) => void
) => {
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
            genre: book.genre !== null ? book.genre?.value : null,
          },
        })
      ),
    onSuccess: (response) => {
      onSuccess?.(response);
    },
  });

  return { updateBook, ...rest };
};
