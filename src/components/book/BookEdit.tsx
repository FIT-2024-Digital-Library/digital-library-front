import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import Select, { Options } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { BookDisplayProps } from './BookDisplay';
import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import {
  allGenresPseudoReqeust,
  allAuthorsPseudoReqeust,
  SelectOption,
} from '@/pages';
import { produce } from 'immer';
import { CreatableSelectHOC } from '../library/CreatableSelectHOC';

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

export const BookEdit: React.FC<BookDisplayProps> = ({
  bookData,
  genreOption,
  authorOption,
}) => {
  const [allAuthors, setAllAuthors] = useState<Options<SelectOption>>([]);
  const [allGenres, setAllGenres] = useState<Options<SelectOption>>([]);
  useEffect(() => {
    allAuthorsPseudoReqeust().then((authors) => setAllAuthors(authors));
    allGenresPseudoReqeust().then((genres) => setAllGenres(genres));
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
    defaultValues: {
      ...bookData,
      published: bookData.published.toDateString(),
      author: authorOption,
      genre: genreOption,
    },
  });

  const saveBookData: SubmitHandler<BookEditData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(saveBookData)}>
      <div className="grid grid-cols-3">
        <div>
          <img
            src={bookData.coverUrl}
            alt={`${bookData.title}'s cover`}
            className="w-full h-full object-cover"
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
              defaultValue={bookData.title}
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
                <CreatableSelectHOC
                  {...field}
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
                <CreatableSelectHOC
                  {...field}
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
            <code>
              <input
                id="published"
                type="date"
                className="pb-1 bg-transparent border-black border-b"
                defaultValue={bookData.published.toDateString()}
                {...register('published')}
              />
            </code>
          </FormItem>
          <FormItem
            className="p-1 my-4 w-full text-black"
            errorMessage={errors.description?.message}
          >
            <textarea
              id="description"
              className="w-full pb-1 bg-transparent border-black border-b h-32"
              defaultValue={bookData.description}
              {...register('description')}
            />
          </FormItem>
          <FormItem
            className="p-1 mb-2 w-full text-black around"
            errorMessage={errors.pdfUrl?.message}
          >
            <Button className="rounded-md w-fit" variant="plate-grey">
              Upload new file
            </Button>
            <a href={bookData.pdfUrl}>
              <Button className="rounded-md w-fit" variant="plate-grey">
                Download book
              </Button>
            </a>
            <input
              disabled
              className="hidden"
              value={bookData.pdfUrl}
              {...register('pdfUrl')}
            />
          </FormItem>
        </div>
        <div className="center col-span-3 my-4">
          <Button
            className="py-2 w-1/6 text-xl"
            variant="plate-black"
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
