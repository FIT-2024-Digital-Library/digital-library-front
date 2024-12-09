import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { Book, getBookBooksBookIdGet } from '@/api';

export type BookId = number | 'new';

export const bookDraft: Book = {
  id: -1,
  title: '',
  author: -1,
  genre: -1,
  publishedDate: '',
  description: '',
  imageUrl: '',
  pdfUrl: '',
};

export const getBookQueryOptions = (id: BookId) =>
  queryOptions({
    queryKey: ['book', id],
    queryFn: () =>
      id === 'new'
        ? bookDraft
        : dataExtractionWrapper(
            getBookBooksBookIdGet({
              path: {
                book_id: id,
              },
            })
          ),
  });

export const useBook = (id: BookId) => {
  const { data: book, ...rest } = useQuery(getBookQueryOptions(id));

  return { book, ...rest };
};
