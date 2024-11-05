import React from 'react';
import { AppRoutes } from '@/routes';
import { Header, Footer } from '@/components/mainWrapper';
import { LoginWindow } from '@/components/auth/LoginWindow';

export const App: React.FC = () => {
  return (
    <>
      <LoginWindow />
      <Header />
      <main>
        <AppRoutes />
      </main>
      {/* <Footer /> */}
    </>
  );
};
