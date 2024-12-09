import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import CreatableSelect from 'react-select/creatable';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { Icon } from '@/components/library/Icon';
import { UploadDropdown } from '@/components/library/UploadDropdown';
import {
  getAuthorsQueryOptions,
  getGenresQueryOptions,
  useAuthor,
  useAuthors,
  useBook,
  useGenre,
  useGenres,
} from '@/query/queryHooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataExtractionWrapper } from '@/query';
import {
  createAuthorAuthorsCreatePost,
  createBookBooksCreatePost,
  createGenreGenresCreatePost,
  updateBookBooksBookIdUpdatePut,
} from '@/api';
import { navigate } from 'wouter/use-browser-location';

export const bookEditScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .required(),
  genre: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .required(),
  publishedDate: z.string().date(),
  description: z.string(),
  imageUrl: z.string(),
  pdfUrl: z.string().url().min(1, "Book's file is required"),
});
export type BookEditData = z.infer<typeof bookEditScheme>;

const selectComponentStaticProps = {
  unstyled: true,
  classNames: {
    container: () => 'w-full border-b border-black',
    menuList: () => 'bg-1-12 my-1 py-1 divide-y-2 divide-black rounded',
    option: () => 'p-2 hover:bg-white',
    dropdownIndicator: () => 'mx-2',
  },
  isSearchable: true,
  isClearable: false,
  maxMenuHeight: 160,
};

export interface BookEditProps {
  bookId: number | 'new';
  setIsEdit?: (value: boolean) => void;
}

export const BookEdit: React.FC<BookEditProps> = ({ bookId, setIsEdit }) => {
  const { book, isPending: isBookPending, error: bookError } = useBook(bookId);
  const {
    author,
    isPending: isAuthorPending,
    error: authorError,
  } = useAuthor(book?.author);
  const {
    genre,
    isPending: isGenrePending,
    error: genreError,
  } = useGenre(book?.genre);
  const { authors } = useAuthors();
  const { genres } = useGenres();

  const { mutate: createBook, error: createBookError } = useMutation({
    mutationFn: (data: { book: BookEditData }) =>
      dataExtractionWrapper(
        createBookBooksCreatePost({
          body: {
            ...data.book,
            author: data.book.author.value,
            genre: data.book.genre.value,
          },
        })
      ),
    onSuccess: (response) => {
      navigate(`/books/${response}`, { replace: true });
    },
  });

  const { mutate: updateBook, error: updateBookError } = useMutation({
    mutationFn: (data: { id: number; book: BookEditData }) =>
      dataExtractionWrapper(
        updateBookBooksBookIdUpdatePut({
          path: {
            book_id: data.id,
          },
          body: {
            ...data.book,
            author: data.book.author.value,
            genre: data.book.genre.value,
          },
        })
      ),
    onSuccess: (response) => {
      setIsEdit?.(false);
    },
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
    defaultValues: {
      author: author ? { value: author.name, label: author.name } : undefined,
      genre: genre ? { value: genre.name, label: genre.name } : undefined,
      imageUrl: book?.imageUrl ?? '',
      pdfUrl: book?.pdfUrl ?? '',
    },
  });

  const saveBookData: SubmitHandler<BookEditData> = (data) => {
    if (bookId !== 'new') updateBook({ id: bookId, book: data });
    else createBook({ book: data });
  };

  return (
    <form onSubmit={handleSubmit(saveBookData)}>
      <div className="grid grid-cols-3">
        <div className="center vstack">
          <img
            src={watch('imageUrl')}
            alt={`${book?.title ?? 'Book'}'s cover`}
            className="w-full h-full object-cover mb-2"
          />
        </div>
        <div className="col-span-2 vstack px-8">
          <FormItem
            className="p-1 w-full text-black text-2xl font-bold mb-4"
            errorMessage={errors.title?.message}
          >
            <input
              id="title"
              placeholder="Title (reauired)"
              className="w-full pb-1 bg-transparent border-black border-b"
              defaultValue={book?.title}
              {...register('title')}
            />
          </FormItem>
          <FormItem
            className="p-1 mb-2 w-full text-black"
            errorMessage={errors.author?.message}
          >
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  {...selectComponentStaticProps}
                  placeholder="Select an author (required)"
                  options={authors?.map((author) => ({
                    value: author.name,
                    label: author.name,
                  }))}
                />
              )}
            />
          </FormItem>
          <FormItem
            className="p-1 mb-2 w-full text-black"
            errorMessage={errors.genre?.message}
          >
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  {...selectComponentStaticProps}
                  placeholder="Select a genre (required)"
                  options={genres?.map((genre) => ({
                    value: genre.name,
                    label: genre.name,
                  }))}
                />
              )}
            />
          </FormItem>
          <FormItem
            className="text-xl flex justify-start mb-2 text-black"
            labelComponent={<span className="pr-1">Published:</span>}
            errorMessage={errors.publishedDate?.message}
          >
            <input
              id="publishedDate"
              type="date"
              className="pb-1 bg-transparent border-black border-b"
              defaultValue={
                book?.publishedDate === null ? undefined : book?.publishedDate
              }
              {...register('publishedDate')}
            />
          </FormItem>
          <FormItem
            className="p-1 my-4 w-full text-black"
            errorMessage={errors.description?.message}
          >
            <textarea
              id="description"
              className="w-full p-2 bg-transparent border-black border h-32 resize-none rounded"
              placeholder="Book's description"
              defaultValue={
                book?.description === null ? undefined : book?.description
              }
              {...register('description')}
            />
          </FormItem>
        </div>
        <div className="center">
          <FormItem errorMessage={errors.imageUrl?.message}>
            <Controller
              control={control}
              name="imageUrl"
              rules={{ required: false }}
              render={({ field: { onChange } }) => (
                <>
                  <UploadDropdown
                    buttonComponent={
                      <Button className="rounded-md w-fit" variant="plate-grey">
                        <span>Upload new cover</span>
                        <Icon icon="add-file" />
                      </Button>
                    }
                    setUploadedLink={onChange}
                  />
                </>
              )}
            />
          </FormItem>
        </div>
        <div className="center">
          <FormItem errorMessage={errors.pdfUrl?.message}>
            <Controller
              control={control}
              name="pdfUrl"
              render={({ field: { onChange } }) => (
                <>
                  <UploadDropdown
                    buttonComponent={
                      <Button className="rounded-md" variant="plate-grey">
                        <span>Upload new PDF</span>
                        <Icon icon="pdf" />
                      </Button>
                    }
                    setUploadedLink={onChange}
                  />
                </>
              )}
            />
          </FormItem>
        </div>
        <div className="center">
          <a href={watch('pdfUrl')}>
            <Button className="rounded-md w-fit" variant="plate-grey">
              <span>Download book</span>
              <Icon icon="download" />
            </Button>
          </a>
        </div>
        <div className="center col-span-3 my-4">
          <Button
            className="py-2 w-1/6 text-xl"
            variant="plate-black"
            type="submit"
          >
            <span>Save</span>
            <Icon icon="save" />
          </Button>
          {(createBookError || updateBookError) && (
            <span className="text-red-500 mx-3">
              {createBookError?.message || updateBookError?.message}
            </span>
          )}
        </div>
      </div>
    </form>
  );
};
