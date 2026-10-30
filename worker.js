/**
 * BRF KORAT STUDIO - Cloudflare Worker Entrypoint + Static Assets
 * Handles `/api/data`, `/api/auth`, `/api/reset` with Cloudflare KV (`BRF_STUDIO_KV`)
 * Falls back to serving static files (`index.html`, `admin.html`, `styles.css`, `shared.js`) via env.ASSETS
 */

import { onRequestGet as dataGet, onRequestPost as dataPost, onRequestOptions as dataOptions } from './functions/api/data.js';
import { onRequestPost as authPost, onRequestOptions as authOptions } from './functions/api/auth.js';
import { onRequestPost as resetPost, onRequestOptions as resetOptions } from './functions/api/reset.js';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const method = request.method.toUpperCase();
        const context = { request, env, ctx };

        if (url.pathname === '/api/data') {
            if (method === 'OPTIONS') return dataOptions(context);
            if (method === 'GET') return dataGet(context);
            if (method === 'POST') return dataPost(context);
        }

        if (url.pathname === '/api/auth') {
            if (method === 'OPTIONS') return authOptions(context);
            if (method === 'POST') return authPost(context);
        }

        if (url.pathname === '/api/reset') {
            if (method === 'OPTIONS') return resetOptions(context);
            if (method === 'POST') return resetPost(context);
        }

        // Serve static HTML/CSS/JS assets
        if (env.ASSETS) {
            return env.ASSETS.fetch(request);
        }

        return new Response('Not Found', { status: 404 });
    }
};
