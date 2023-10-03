import * as path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        eslintPlugin({
            // include: ['**/*.{js,ts,tsx,vue']
        }),
        svgLoader(),
        vue(),
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    base: '/3d-tic-tac-toe/',
})
