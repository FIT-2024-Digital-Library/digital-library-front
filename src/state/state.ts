import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { Mutator } from './types';
import {
  CollectionsState,
  UIState,
  createCollectionsStateSlice,
  createUIStateSlice,
} from './slices';

type StoreType = UIState & CollectionsState;

export const useAppStore = create<StoreType>()(
  devtools((set, ...rest) => {
    const mutate: Mutator<StoreType> = (mutator) => set(produce(mutator));

    return {
      ...createUIStateSlice(mutate, set, ...rest),
      ...createCollectionsStateSlice(mutate, set, ...rest),
    };
  })
);
