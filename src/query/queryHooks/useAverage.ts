import { useQuery, queryOptions } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import { getAverageMarkReviewsAverageBookIdGet } from '@/api';

export const getAverageQueryOptions = (bookId: number) =>
  queryOptions({
    queryKey: ['average', bookId],
    queryFn: () =>
      dataExtractionWrapper(
        getAverageMarkReviewsAverageBookIdGet({
          path: {
            book_id: bookId,
          },
        })
      ),
  });

export const useAverage = (bookId: number) => {
  const { data: average, ...rest } = useQuery(getAverageQueryOptions(bookId));

  return { average, ...rest };
};
