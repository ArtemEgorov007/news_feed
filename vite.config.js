import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production'
const base = isProd ? '/news_feed/' : '/'

// https://vite.dev/config/
export default defineConfig({
    base,
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        open: true,
        port: 3000
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    }
})