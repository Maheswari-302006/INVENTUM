import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 Use this instead of './'
  build: {
    outDir: 'dist', // ensure correct build output
  },
});
