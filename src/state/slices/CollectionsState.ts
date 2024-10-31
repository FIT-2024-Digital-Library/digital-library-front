import { Immutable } from 'immer';

import { Slice } from '@/state';

export type CardType = {
  id: number;
  previewText: string;
  frontSide: string;
  backSide: string;
};
export type CollectionType = {
  id: number;
  title: string;
  description: string;
  isPublic: boolean;
  cards: CardType[];
};
export type CollectionsState = Immutable<{
  collections: CollectionType[];
}>;

function getCardExample(id: number): Immutable<CardType> {
  return {
    id: id,
    previewText: `Card ${id}`,
    frontSide: 'Card content. '.repeat(200),
    backSide: 'Card content. '.repeat(200),
  };
}

export const CollectionSelectorsFactories = {
  getCollection: (id: number) => (state: CollectionsState) => {
    return state.collections.find((collection) => collection.id === id);
  },
};

export const createCollectionsStateSlice: Slice<CollectionsState> = (
  mutate
) => {
  return {
    collections: [
      {
        id: 1,
        title: 'The first collection',
        description: 'The first test collection',
        isPublic: true,
        cards: [
          { ...getCardExample(0) },
          { ...getCardExample(1) },
          { ...getCardExample(2) },
          { ...getCardExample(3) },
          { ...getCardExample(4) },
          { ...getCardExample(5) },
          { ...getCardExample(6) },
        ],
      },
    ],
  };
};
