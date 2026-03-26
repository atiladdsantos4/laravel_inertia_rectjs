import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
//import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path'



export default defineConfig({
    base: './',
    build: {
            chunkSizeWarningLimit: 1000,
            rollupOptions: {
                output: {
                    // Set fixed names for entry files, chunks, and general assets
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name]-chunk.js`,
                    assetFileNames: `assets/[name].[ext]`,
                }
            }
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/app.js'],
            refresh: true,
        }),
        //tailwindcss(),
        react()
    ],
    server: {
        cors: true, // This is equivalent to origin: '*'
        //https: true,
        //host: 'untrumpeted-charmingly-freddy.ngrok-free.dev',
        allowedHosts: ['untrumpeted-charmingly-freddy.ngrok-free.dev','jemosistemas-domain.com'],
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        // hmr: {
        //     host: 'untrumpeted-charmingly-freddy.ngrok-free.dev',
        // },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/jsx'),
            '@images': path.resolve(__dirname, 'resources/images'),
            //'@components': path.resolve(__dirname, './resources/js/components'),
        },
    },
});
