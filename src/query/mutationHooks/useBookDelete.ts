import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { Book, deleteBookBooksBookIdDeleteDelete } from '@/api';

export const useBookDelete = (
  bookId: number,
  onSuccess?: (book: Book) => void
) => {
  const { mutate: deleteBook, ...rest } = useMutation({
    mutationFn: () =>
      dataExtractionWrapper(
        deleteBookBooksBookIdDeleteDelete({
          path: { book_id: bookId },
        })
      ),
    onSuccess,
  });
  return { deleteBook, ...rest };
};
