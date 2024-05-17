/*
 * This file is part of the agenda-display project.
 *
 * (c) Nils Bohrs
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        strictPort: true,
        port: 3000,
        watch: {
            ignored: [
                'db/**',
                'dist/**',
            ],
        },
    },
    plugins: [react()],
    build: {
        manifest: true,
    },
});
