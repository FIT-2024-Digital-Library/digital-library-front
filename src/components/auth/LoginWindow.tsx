import React from 'react';

import { PopUp } from '@/components/library/PopUp';
import { useAppStore } from '@/state';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import clsx from 'clsx';

export const LoginWindow: React.FC = () => {
  const authWindowState = useAppStore((state) => state.authWindow);
  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);
  const toggleActiveAuthWindow = useAppStore(
    (state) => state.toggleActiveAuthWindow
  );

  const isLogin = authWindowState === 'login';
  const isRegister = authWindowState === 'register';

  return (
    <PopUp
      isShown={authWindowState !== 'hidden'}
      close={closeAuthWindow}
      className="bg-1-12/75 backdrop-blur-sm"
    >
      <div className="center">
        <div className="absolute top-20 w-2/3 h-fit shadow shadow-black bg-white grid grid-cols-2 font-serif">
          <div>
            <img
              src="https://avatars.mds.yandex.net/i?id=814637c78277135739ec143a4f3ff0a5_l-5235819-images-thumbs&n=13"
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 vstack center">
            <h1 className="text-lg md:text-2xl text-center text-black my-4">
              Welcome to Digital library
            </h1>
            <h2 className="text-md md:text-lg text-center text-black my-2">
              {isLogin ? 'Sigining in' : 'Regsitration'}
            </h2>
            <div
              className={clsx(
                'transition-all duration-300 w-full relative',
                isLogin ? 'h-fit opacity-1' : 'h-0 opacity-0 -translate-x-12'
              )}
            >
              {isLogin && <LoginForm />}
            </div>
            <div
              className={clsx(
                'transition-all duration-300 w-full',
                isRegister ? 'h-fit opacity-1' : 'h-0 opacity-0 translate-x-12'
              )}
            >
              {isRegister && <RegisterForm />}
            </div>
            <div
              className="around w-full hover:cursor-pointer my-2"
              onClick={toggleActiveAuthWindow}
            >
              {isLogin ? (
                <span>
                  New in Digital library? <u>Create account</u>
                </span>
              ) : (
                <span>
                  Already registered? <u>Log in</u>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};
