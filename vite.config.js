import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
//import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path'
//import { nodePolyfills } from 'vite-plugin-node-polyfills'



export default defineConfig({
    base: './',
    build: {
            chunkSizeWarningLimit: 3000,
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
        react(),
        //tailwindcss(),
    ],
    server: {
        cors: true, // This is equivalent to origin: '*'
        host: '0.0.0.0', //allow all network interfaces
        //https: true,
        //host: 'untrumpeted-charmingly-freddy.ngrok-free.dev',
        allowedHosts: ['untrumpeted-charmingly-freddy.ngrok-free.dev','jemosistemas-domain.com'],
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        hmr:{
           //port:80,
           //clientPort:80,
           host: ['jemosistemas-domain.com'], //allow listen by this domains
        }
        // hmr: {
        //      host: ['jemosistemas-domain.com'], //allow listem by this domains
        // },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/jsx'),
            '@images': path.resolve(__dirname, 'resources/images'),
            //'vite-plugin-node-polyfills/shims/buffer': 'vite-plugin-node-polyfills/shims/buffer/dist/index.js',
        },
    },
});
