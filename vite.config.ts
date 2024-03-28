import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      Components({
          resolvers: [
              PrimeVueResolver()
          ]
      }),
      VueRouter({}),
      vue()
  ],
})
