import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { Options } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { produce } from 'immer';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import {
  allGenresPseudoReqeust,
  allAuthorsPseudoReqeust,
  SelectOption,
  BookType,
} from '@/pages';
import { Icon } from '@/components/library/Icon';
import { UploadDropdown } from '@/components/library/UploadDropdown';

export const bookEditScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .required(),
  genre: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .required(),
  published: z.string().date(),
  description: z.string().min(1, 'Description is required'),
  coverUrl: z.string().url(),
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
  isNew?: boolean;
  bookData?: BookType;
  genreOption?: SelectOption;
  authorOption?: SelectOption;
}

export const BookEdit: React.FC<BookEditProps> = ({
  bookData,
  genreOption,
  authorOption,
}) => {
  const isNew = bookData === undefined;
  const [allAuthors, setAllAuthors] = useState<Options<SelectOption>>([]);
  const [allGenres, setAllGenres] = useState<Options<SelectOption>>([]);
  useEffect(() => {
    allAuthorsPseudoReqeust().then((authors) => setAllAuthors(authors));
    allGenresPseudoReqeust().then((genres) => setAllGenres(genres));
  }, []);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
    defaultValues: {
      author: authorOption,
      genre: genreOption,
      coverUrl: bookData?.coverUrl ?? '',
      pdfUrl: bookData?.pdfUrl ?? '',
    },
  });

  const saveBookData: SubmitHandler<BookEditData> = (data) => {
    if (isNew) console.log('Creating book...');
    else console.log('Saving book...');
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(saveBookData)}>
      <div className="grid grid-cols-3">
        <div className="center vstack">
          <img
            src={watch('coverUrl')}
            alt={`${bookData?.title ?? 'Book'}'s cover`}
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
              defaultValue={bookData?.title}
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
                  options={allAuthors}
                  onCreateOption={(optionLabel) => {
                    setAllAuthors(
                      produce((authorsDraft) => {
                        authorsDraft.push({
                          value: authorsDraft.length,
                          label: optionLabel,
                        });
                      })
                    );
                  }}
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
                  options={allGenres}
                  onCreateOption={(optionLabel) => {
                    setAllGenres(
                      produce((authorsDraft) => {
                        authorsDraft.push({
                          value: authorsDraft.length,
                          label: optionLabel,
                        });
                      })
                    );
                  }}
                />
              )}
            />
          </FormItem>
          <FormItem
            className="text-xl flex justify-start mb-2 text-black"
            labelComponent={<span className="pr-1">Published:</span>}
            errorMessage={errors.published?.message}
          >
            <input
              id="published"
              type="date"
              className="pb-1 bg-transparent border-black border-b"
              defaultValue={bookData?.published.toISOString().split('T')[0]}
              {...register('published')}
            />
          </FormItem>
          <FormItem
            className="p-1 my-4 w-full text-black"
            errorMessage={errors.description?.message}
          >
            <textarea
              id="description"
              className="w-full p-2 bg-transparent border-black border h-32 resize-none rounded"
              defaultValue={bookData?.description}
              {...register('description')}
            />
          </FormItem>
        </div>
        <div className="center">
          <FormItem errorMessage={errors.coverUrl?.message}>
            <Controller
              control={control}
              name="coverUrl"
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
                      <Button className="rounded-md w-fit" variant="plate-grey">
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
        </div>
      </div>
    </form>
  );
};
