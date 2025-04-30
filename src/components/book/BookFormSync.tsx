import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
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
import { useAuthors, useGenres, useProfile } from '@/query/queryHooks';
import { getTheme, themes } from './themes';
import { getFileRealUrl } from '@/query';
import {
  BookEditData,
  bookEditScheme,
  selectComponentStaticProps,
} from './BookForm';

export interface BookFormSyncProps {
  data: BookEditData;
  setDataByKey: (key: string, val: string) => void;
  submitAction: (data: BookEditData) => void;
}

export const BookFormSync: React.FC<BookFormSyncProps> = ({
  data,
  setDataByKey,
  submitAction,
}) => {
  const {
    profile,
    isPending: isProfilePending,
    error: profileError,
  } = useProfile();
  const {
    authors,
    isPending: isAuthorsPending,
    error: authorsError,
  } = useAuthors();
  const {
    genres,
    isPending: isGenresPending,
    error: genresError,
  } = useGenres();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditScheme),
    values: data,
  });
  const imageUrlWatched = useWatch({ name: 'imageQname', control: control });
  const pdfUrlWatched = useWatch({ name: 'pdfQname', control: control });

  return (
    <LoadableComponent
      isPending={isProfilePending || isAuthorsPending || isGenresPending}
      errorMessage={
        profileError?.message ||
        authorsError?.message ||
        genresError?.message ||
        (profile?.privileges === 'basic'
          ? 'Only previleged users can add or edit books'
          : undefined)
      }
      animated
    >
      <form onSubmit={handleSubmit((data) => submitAction(data))}>
        <div className="grid grid-cols-3">
          <div className="center vstack">
            <img
              src={
                imageUrlWatched && imageUrlWatched !== null
                  ? getFileRealUrl(imageUrlWatched)
                  : ''
              }
              alt={`${data?.title || 'Book'}'s cover`}
              className="w-full h-full object-cover mb-2"
            />
          </div>
          <div className="col-span-2 vstack px-8">
            <FormItem
              className="p-1 w-full text-black text-2xl font-bold mb-4"
              errorMessage={errors.title?.message}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="title"
                    placeholder="Title (required)"
                    className="w-full pb-1 bg-transparent border-black border-b"
                    onChange={(e) => {
                      setDataByKey('title', e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
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
                    onChange={(option) => {
                      setDataByKey('theme', String(option?.value));
                      field.onChange(option);
                    }}
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
                    onChange={(option) => {
                      setDataByKey('author', option?.value || '');
                      field.onChange(option);
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
                    placeholder="Select a genre"
                    isClearable
                    options={genres?.map((genre) => ({
                      value: genre.name,
                      label: genre.name,
                    }))}
                    onChange={(option) => {
                      setDataByKey('genre', option?.value || '');
                      field.onChange(option);
                    }}
                  />
                )}
              />
            </FormItem>
            <FormItem
              className="text-xl flex justify-start mb-2 text-black"
              labelComponent={<span className="pr-1">Publication year:</span>}
              errorMessage={errors.publishedDate?.message}
            >
              <Controller
                name="publishedDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="publishedDate"
                    type="number"
                    className="pb-1 bg-transparent border-black border-b font-mono"
                    value={field.value !== null ? field.value : ''}
                    onChange={(e) => {
                      setDataByKey('publishedDate', e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </FormItem>
            <FormItem
              className="p-1 my-4 w-full text-black"
              errorMessage={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className="w-full p-2 bg-transparent border-black border h-32 resize-none rounded"
                    placeholder="Book's description"
                    value={field.value !== null ? field.value : ''}
                    onChange={(e) => {
                      setDataByKey('description', e.target.value);
                      field.onChange(e);
                    }}
                  />
                )}
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
                      onSuccess={(response) => {
                        setDataByKey('imageQname', response.qname);
                        onChange(response.qname);
                      }}
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
                      onSuccess={(response) => {
                        setDataByKey('pdfQname', response.qname);
                        onChange(response.qname);
                      }}
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
          </div>
        </div>
      </form>
    </LoadableComponent>
  );
};
