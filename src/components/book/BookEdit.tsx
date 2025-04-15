import React from 'react';
import { SubmitHandler, useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import {
  Button,
  FormItem,
  Icon,
  UploadButton,
  LoadableComponent,
} from '@/components/library';
import {
  useAuthor,
  useAuthors,
  useBook,
  useGenre,
  useGenres,
  useProfile,
} from '@/query/queryHooks';
import { getTheme, themes } from './themes';
import { getFileRealUrl } from '@/query';
import { useLocation } from 'wouter';
import { useBookCreate, useBookUpdate } from '@/query/mutationHooks';

export const bookEditScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  theme: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .required(),
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
    .optional()
    .nullable(),
  publishedDate: z.number({ coerce: true }),
  description: z.string(),
  imageQname: z.string().optional().nullable(),
  pdfQname: z.string().min(1, 'Book file is required'),
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
  const [, setLocation] = useLocation();

  const {
    profile,
    isPending: isProfilePending,
    error: profileError,
  } = useProfile();
  const { book, isPending: isBookPending, error: bookError } = useBook(bookId);
  const { author, isPending: isAuthorPending } = useAuthor(
    book?.author === -1 ? undefined : book?.author
  );
  const { genre, isPending: isGenrePending } = useGenre(book?.genre);
  const { authors } = useAuthors();
  const { genres } = useGenres();

  const { createBook, error: createBookError } = useBookCreate((response) => {
    setLocation(`/books/${response}`, { replace: true });
  });

  const { updateBook, error: updateBookError } = useBookUpdate(bookId, () => {
    setIsEdit?.(false);
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
    defaultValues: {
      theme: book
        ? { value: book.themeId, label: getTheme(book.themeId).name }
        : undefined,
      author: author ? { value: author.name, label: author.name } : undefined,
      genre: genre ? { value: genre.name, label: genre.name } : undefined,
      imageQname: book?.imageQname,
      pdfQname: book?.pdfQname ?? '',
    },
  });
  const imageUrlWatched = useWatch({ name: 'imageQname', control: control });
  const pdfUrlWatched = useWatch({ name: 'pdfQname', control: control });

  const saveBookData: SubmitHandler<BookEditData> = (data) => {
    if (bookId !== 'new') updateBook(data);
    else createBook(data);
  };

  return (
    <LoadableComponent
      isPending={
        isProfilePending ||
        isBookPending ||
        (bookId !== 'new' && (isAuthorPending || isGenrePending))
      }
      errorMessage={
        bookError?.message ||
        profileError?.message ||
        (profile?.privileges === 'basic'
          ? 'Only previleged users can add or edit books'
          : undefined)
      }
      animated
    >
      <form onSubmit={handleSubmit(saveBookData)}>
        <div className="grid grid-cols-3">
          <div className="center vstack">
            <img
              src={
                imageUrlWatched && imageUrlWatched !== null
                  ? getFileRealUrl(imageUrlWatched)
                  : ''
              }
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
                placeholder="Title (required)"
                className="w-full pb-1 bg-transparent border-black border-b"
                defaultValue={book?.title}
                {...register('title')}
              />
            </FormItem>
            <FormItem
              className="p-1 mb-2 w-full text-black"
              errorMessage={errors.theme?.message}
            >
              <Controller
                name="theme"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    {...selectComponentStaticProps}
                    placeholder="Select a book's displaying theme (required)"
                    options={themes.map((theme) => ({
                      value: theme.id,
                      label: theme.name,
                    }))}
                  />
                )}
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
                    placeholder="Select a genre"
                    isClearable
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
              labelComponent={<span className="pr-1">Publication year:</span>}
              errorMessage={errors.publishedDate?.message}
            >
              <input
                id="publishedDate"
                type="number"
                className="pb-1 bg-transparent border-black border-b font-mono"
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
            <FormItem errorMessage={errors.imageQname?.message}>
              <Controller
                control={control}
                name="imageQname"
                rules={{ required: false }}
                render={({ field: { onChange } }) => (
                  <>
                    <UploadButton
                      buttonText="Upload new image"
                      buttonClassname="rounded-md w-fit"
                      onSuccess={(response) => onChange(response.qname)}
                    />
                  </>
                )}
              />
            </FormItem>
          </div>
          <div className="center">
            <FormItem errorMessage={errors.pdfQname?.message}>
              <Controller
                control={control}
                name="pdfQname"
                render={({ field: { onChange } }) => (
                  <>
                    <UploadButton
                      buttonText="Upload new PDF"
                      buttonClassname="rounded-md"
                      onSuccess={(response) => onChange(response.qname)}
                    />
                  </>
                )}
              />
            </FormItem>
          </div>
          <div className="center">
            <a href={getFileRealUrl(pdfUrlWatched)}>
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
    </LoadableComponent>
  );
};
