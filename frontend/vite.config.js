import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './', // should point to frontend root
  build: {
    outDir: 'dist',
  },
  
});
