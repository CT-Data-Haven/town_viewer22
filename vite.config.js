import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mdPlugin({ mode: Mode.REACT }),
        svgr(),
    ],
    base: '/town_viewer22/',
});
