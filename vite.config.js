import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  define: {
    // This will suppress the DevTools warning during development
    __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
  }
}); 