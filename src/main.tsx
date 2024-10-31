import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { client } from '@/api';
import '@/index.css';

const container = document.getElementById(`root`);
const root = createRoot(container!);

client.setConfig({
  baseUrl: 'http://127.0.0.1:8000',
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
