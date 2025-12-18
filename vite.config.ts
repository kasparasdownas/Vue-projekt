import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  base: '/Vue-projekt/',
  plugins: [vue(), vuetify()],
  server: {
    port: 5174,
    host: true,
  },
  ssr: {
    noExternal: ['vuetify'],
  },
  test: {
    environment: 'jsdom',
    css: true,
    deps: {
      inline: ['vuetify'],
    },
  },
});
