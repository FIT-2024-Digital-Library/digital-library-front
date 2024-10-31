import { StoreApi } from 'zustand';
import { Draft } from 'immer';

export type Mutator<T> = (m: (d: Draft<T>) => void) => void;

export type SliceApi<T> = { mutate: Mutator<T> };

export type Slice<T> = (
  mutate: Mutator<T>,
  set: StoreApi<T>['setState'],
  get: StoreApi<T>['getState'],
  api: StoreApi<T>
) => T;

// TODO: Очень хотелось бы понять, как через StateCreator сделать нечто похожее на тип выше
// export type Slice2<T, U = T> = StateCreator<
//   T,
//   [],
//   [],
//   T & U
// >;
