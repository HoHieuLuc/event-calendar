import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'Event Calendar',
                short_name: 'Event Calendar',
                description: 'Event Calendar',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ],
            },
        }),
    ],
    base: '/',
    resolve: {
        alias: [
            {
                find: '~',
                replacement: '/src',
            },
        ],
    },
});
