import React, { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Button } from '@/components/library/Button';

const authors = [{ value: 0, label: 'George R.R. Martin' }];

const genres = [{ value: 0, label: 'Fantasy' }];

const bookDataDraft = {
  coverUrl:
    'https://static.onlinetrade.ru/img/items/m/kniga_mir_lda_i_plameni_ofitsialnaya_istoriya_vesterosa_i_igry_prestolov_martin_dzhordzh_r_r_1513773582_2.jpg',
  title: 'A Song of Ice and Fire',
  authorId: 0,
  genreId: 0,
  published: new Date('1996.01.01'),
  description:
    "A Song of Ice and Fire depicts a violent world dominated by political realism. What little supernatural power exists is confined to the margins of the known world. Moral ambiguity pervades the books, and their stories continually raise questions concerning loyalty, pride, human sexuality, piety, and the morality of violence.\nThe story unfolds through a rotating set of subjective points of view, the success or survival of any of which is never assured. Each chapter is told from a limited third-person perspective, drawn from a group of characters that grows from nine in the first novel to 31 by the fifth.\nThe novels are set on the fictional continents of Westeros and Essos. Martin's stated inspirations for the series include the Wars of the Roses and The Accursed Kings, a series of French historical novels by Maurice Druon.[3][4] The work as a whole consists of three interwoven plots: a dynastic war among several families for control of Westeros, the growing threat posed by the powerful supernatural Others from the northernmost region of Westeros, and the ambition of the daughter of the deposed Westerosi king to return from her exile in Essos and assume the Iron Throne.",
  pdf_url:
    'https://static.onlinetrade.ru/img/items/m/kniga_mir_lda_i_plameni_ofitsialnaya_istoriya_vesterosa_i_igry_prestolov_martin_dzhordzh_r_r_1513773582_2.jpg',
};

const allAuthorsPseudoReqeust = async () => {
  return authors;
};

const allGenresPseudoReqeust = async () => {
  return genres;
};

const bookDataPseudoReqeust = async (id: number) => {
  if (id == 0) return bookDataDraft;
  throw new Error('Book not found');
};

export const BookPage: React.FC = () => {
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);
  const [author, setAuthor] = useState<(typeof authors)[0]>();
  const [genre, setGenre] = useState<(typeof genres)[0]>();
  const [bookData, setBookData] = useState<typeof bookDataDraft | undefined>(
    undefined
  );

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
  }, [id]);

  return (
    <div className="vstack mx-2 md:mx-10 xl:mx-32 px-2 md:px-5 text-black rounded-md">
      {!bookData ? (
        <h1>Book not found</h1>
      ) : (
        <div className="grid grid-cols-3">
          <div>
            <img
              src={bookData.coverUrl}
              alt={`${bookData.title}'s cover`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 vstack px-8">
            <h1 className="text-2xl font-bold mb-4">{bookData.title}</h1>
            {author && <h2 className="text-xl mb-2 italic">{author.label}</h2>}
            {genre && <h2 className="text-xl mb-2 italic">{genre.label}</h2>}
            <h2 className="text-xl mb-2">
              Published: <code>{bookData.published.toDateString()}</code>
            </h2>
            <p className="my-4">{bookData.description}</p>
            <a href={bookData.pdf_url}>
              <Button variant="plate-grey">Download book</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
