import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/* Every VITE_* variable is compiled into the public bundle: refuse to build with anything that looks like a secret. */
function noSecretsInBundle(env) {
  return {
    name: 'no-secrets-in-bundle',
    config() {
      const leaked = Object.keys(env).filter((k) => /^VITE_.*(KEY|SECRET|TOKEN|PASSWORD|PRIVATE)/i.test(k));
      if (leaked.length) throw new Error(`Refusing to build: ${leaked.join(', ')} would be published in the client bundle. Keep secrets in the worker (worker/).`);
    },
  };
}

/* Production-only Content-Security-Policy (dev needs inline scripts for React refresh). */
function csp(env) {
  let chat = '';
  try { if (env.VITE_CHAT_ENDPOINT) chat = ` ${new URL(env.VITE_CHAT_ENDPOINT).origin}`; } catch { /* invalid URL: no extra origin */ }
  const policy = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' https://fonts.googleapis.com",
    'font-src https://fonts.gstatic.com',
    "img-src 'self' data:",
    "media-src 'self'",
    `connect-src 'self'${chat}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
  return {
    name: 'csp',
    apply: 'build',
    transformIndexHtml: (html) => html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`),
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...Object.fromEntries(Object.entries(process.env).filter(([k]) => k.startsWith('VITE_'))) };
  return {
    plugins: [noSecretsInBundle(env), react(), csp(env)],
    base: '/alianassamr.github.io/',
    server: { port: 5173, open: true },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/framer-motion')) return 'vendor';
          },
        },
      },
    },
  };
});
