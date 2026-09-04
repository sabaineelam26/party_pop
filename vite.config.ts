import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Ensures /admin/login and /admin/dashboard are handled by React Router
    // instead of returning a 404 from the dev server
    historyApiFallback: true,
  },
});
