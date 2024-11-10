import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { BookDisplayProps } from './BookDisplay';
import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';

const bookEditScheme = z.object({
  title: z.string().min(1, 'Title is required'),
  authorId: z.number().min(0),
  genreId: z.number().min(0),
  published: z.date(),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
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
          <h1 className="text-2xl font-bold mb-4">
            <FormItem
              className="p-1 w-full text-black"
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
          </h1>
          <h2 className="text-xl mb-2 italic">
            <FormItem
              className="p-1 w-full text-black"
              errorMessage={errors.authorId?.message}
            >
              <input
                id="authorId"
                className="w-full pb-1 bg-transparent border-black border-b"
                defaultValue={authorOption?.value}
                {...register('authorId')}
              />
            </FormItem>
          </h2>
          <h2 className="text-xl mb-2 italic">
            <FormItem
              className="p-1 w-full text-black"
              errorMessage={errors.genreId?.message}
            >
              <input
                id="genreId"
                className="w-full pb-1 bg-transparent border-black border-b"
                defaultValue={genreOption?.value}
                {...register('genreId')}
              />
            </FormItem>
          </h2>
          <h2 className="text-xl flex justify-start">
            <span className="pr-1">Published:</span>
            <code>
              <FormItem
                className="text-black"
                errorMessage={errors.published?.message}
              >
                <input
                  id="published"
                  type="date"
                  className="pb-1 bg-transparent border-black border-b"
                  defaultValue={bookData.published.toDateString()}
                  {...register('published')}
                />
              </FormItem>
            </code>
          </h2>
          <p className="my-4">
            <FormItem
              className="p-1 w-full text-black"
              errorMessage={errors.description?.message}
            >
              <textarea
                id="description"
                className="w-full pb-1 bg-transparent border-black border-b h-32"
                defaultValue={bookData.description}
                {...register('description')}
              />
            </FormItem>
          </p>
          <a className="w-fit" href={bookData.pdf_url}>
            <Button
              className="px-4 py-2 font-bold text-xl rounded-lg"
              variant="plate-grey"
            >
              Download book
            </Button>
          </a>
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
