import { useMutation } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { createBookBooksCreatePost } from '@/api';
import { BookEditData } from '@/components/book/BookForm';

export const useBookCreate = (onSuccess?: (bookId: number) => void) => {
  const { mutate: createBook, ...rest } = useMutation({
    mutationFn: (book: BookEditData) =>
      dataExtractionWrapper(
        createBookBooksCreatePost({
          body: {
            ...book,
            imageQname: book.imageQname !== null ? book.imageQname : undefined,
            themeId: book.theme.value,
            author: book.author.value,
            genre: book.genre !== null ? book.genre?.value : null,
          },
        })
      ),
    onSuccess,
  });

  return { createBook, ...rest };
};
