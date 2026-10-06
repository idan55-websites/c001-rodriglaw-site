import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { publicRoutes } from './src/utils/seo.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'preview-prerendered-routes',
    configurePreviewServer(server) {
      // Mirror the production rewrites in vercel.json for clean route URLs.
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname !== '/' && publicRoutes.includes(url.pathname)) {
          request.url = `${url.pathname}/index.html${url.search}`;
        }
        next();
      });
    },
  }],
})
