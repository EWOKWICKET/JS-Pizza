import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  // build: {
  //   sourcemap: true, 
  //   outDir: 'dist', 
  //   rollupOptions: {
  //     input: './Frontend/src/main.ts'
  //   }
  // },
  server: {
    open: true, 
    port: 3000, 
    hmr: {
      overlay: false
    }
  }
});
