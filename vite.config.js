import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/index.jsx',
        'resources/js/pages/CreateTicketForm.jsx',
        'resources/js/pages/EditTicketForm.jsx',
      ],
      refresh: true,
    }),
    react(),
  ],
});