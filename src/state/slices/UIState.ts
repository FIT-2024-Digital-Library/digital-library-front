import { Immutable } from 'immer';

import { Slice } from '@/state';

export type UIState = Immutable<{
  authWindow: 'hidden' | 'login' | 'register';
  closeAuthWindow: () => void;
  showLoginWindow: () => void;
  showRegisterWindow: () => void;
  toggleActiveAuthWindow: () => void;
}>;

export const createUIStateSlice: Slice<UIState> = (mutate) => {
  return {
    authWindow: 'hidden',
    closeAuthWindow: () => {
      mutate((state) => {
        state.authWindow = 'hidden';
      });
    },
    showLoginWindow: () => {
      mutate((state) => {
        state.authWindow = 'login';
      });
    },
    showRegisterWindow: () => {
      mutate((state) => {
        state.authWindow = 'register';
      });
    },
    toggleActiveAuthWindow: () => {
      mutate((state) => {
        switch (state.authWindow) {
          case 'login':
            state.authWindow = 'register';
            break;
          case 'register':
            state.authWindow = 'login';
            break;
          case 'hidden':
        }
      });
    },
  };
};
