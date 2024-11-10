import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Options } from 'react-select';

import { Button } from '@/components/library/Button';
import { BookDisplay } from '@/components/book/BookDisplay';
import { BookEdit } from '@/components/book/BookEdit';

export type SelectOption = {
  value: number;
  label: string;
};

const authors: Options<SelectOption> = [
  { value: 0, label: 'George R.R. Martin' },
  { value: 1, label: 'George R.R. Martin' },
  { value: 2, label: 'George R.R. Martin' },
];

const genres: Options<SelectOption> = [
  { value: 0, label: 'Fantasy' },
  { value: 1, label: 'Sci-Fi' },
  { value: 2, label: 'Novel' },
];

const bookDataDraft = {
  coverUrl:
    'https://static.onlinetrade.ru/img/items/m/kniga_mir_lda_i_plameni_ofitsialnaya_istoriya_vesterosa_i_igry_prestolov_martin_dzhordzh_r_r_1513773582_2.jpg',
  title: 'A Song of Ice and Fire',
  authorId: 0,
  genreId: 0,
  published: new Date('1996.01.01'),
  description:
    "A Song of Ice and Fire depicts a violent world dominated by political realism. What little supernatural power exists is confined to the margins of the known world. Moral ambiguity pervades the books, and their stories continually raise questions concerning loyalty, pride, human sexuality, piety, and the morality of violence.\nThe story unfolds through a rotating set of subjective points of view, the success or survival of any of which is never assured. Each chapter is told from a limited third-person perspective, drawn from a group of characters that grows from nine in the first novel to 31 by the fifth.\nThe novels are set on the fictional continents of Westeros and Essos. Martin's stated inspirations for the series include the Wars of the Roses and The Accursed Kings, a series of French historical novels by Maurice Druon.[3][4] The work as a whole consists of three interwoven plots: a dynastic war among several families for control of Westeros, the growing threat posed by the powerful supernatural Others from the northernmost region of Westeros, and the ambition of the daughter of the deposed Westerosi king to return from her exile in Essos and assume the Iron Throne.",
  pdfUrl:
    'https://static.onlinetrade.ru/img/items/m/kniga_mir_lda_i_plameni_ofitsialnaya_istoriya_vesterosa_i_igry_prestolov_martin_dzhordzh_r_r_1513773582_2.jpg',
};

export type BookType = typeof bookDataDraft;

export const allAuthorsPseudoReqeust = async () => {
  return authors;
};

export const allGenresPseudoReqeust = async () => {
  return genres;
};

const bookDataPseudoReqeust = async (id: number) => {
  if (id == 0) return bookDataDraft;
  throw new Error('Book not found');
};

const hasRightsPseudoRequset = async () => {
  return true;
};

export const BookPage: React.FC = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [author, setAuthor] = useState<SelectOption>();
  const [genre, setGenre] = useState<SelectOption>();
  const [bookData, setBookData] = useState<BookType | undefined>(undefined);

  useEffect(() => {
    bookDataPseudoReqeust(Number(id))
      .then((bookData) => {
        setBookData(bookData);
        allAuthorsPseudoReqeust().then((authorsList) =>
          setAuthor(
            authorsList.find((author) => author.value === bookData.authorId)
          )
        );
        allGenresPseudoReqeust().then((genresList) =>
          setGenre(genresList.find((genre) => genre.value === bookData.genreId))
        );
      })
      .catch((error) => console.log(error));
    hasRightsPseudoRequset().then((value) => setCanEdit(value));
  }, [id]);

  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      {!bookData ? (
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
      ) : (
        <>
          {!isEdit ? (
            <BookDisplay
              bookData={bookData}
              authorOption={author}
              genreOption={genre}
            />
          ) : (
            <BookEdit
              bookData={bookData}
              authorOption={author}
              genreOption={genre}
            />
          )}
          {canEdit && !isEdit && (
            <div className="grid grid-cols-3 my-2">
              <div className="grid grid-cols-2">
                <Button
                  className="mx-1 py-2 text-xl"
                  variant="plate-black"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </Button>
                <Button className="mx-1 py-2 text-xl" variant="plate-black">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
