import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { client } from '@/api';
import '@/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const serverUrl = 'http://127.0.0.1:8000';
// console.log(serverUrl);
client.setConfig({
  baseUrl: serverUrl,
  credentials: 'include',
});

const queryClient = new QueryClient();

const container = document.getElementById(`root`);
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
