// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vtbot from 'astro-vtbot';

import path from 'path';
import formatClassname from './util/formatClassname';

// import { createStarlightIntegration } from './src/starlight/integration.ts'; // comment out if interim docs enabled
import mdx from '@astrojs/mdx'; // comment out if starlight docs enabled

const integrations = [
  // createStarlightIntegration(), // comment out if interim docs enabled
  react({
    babel: {
      plugins: [formatClassname],
    },
  }),
  vtbot(),
  mdx(), // comment out if starlight docs enabled
];

export default defineConfig({
  devToolbar: {
    enabled: false, // also happens to fix error 'The request url "<redacted>" is outside of Vite serving allow list.'
  },
  redirects: {
    '/releases': '/releases/4.1.1', // redirect to latest release

    '/planned': '/roadmap',
    '/support': '/docs',
    '/v4': '/releases/4.0.0',
    '/release-4-0-0': '/releases/4.0.0',
    '/release-4-0-1': '/releases/4.0.1',
    '/release-4-0-2': '/releases/4.0.2',
    '/release-4-0-3': '/releases/4.0.3',
    '/release-4-0-4': '/releases/4.0.4',
    '/release-4-0-5': '/releases/4.0.5',
    '/release-4-1-0': '/releases/4.1.0',
    '/release-4-1-1': '/releases/4.1.1',
  },
  integrations,
  vite: {
    // @tailwindcss/vite plugin: issue with Vite and plugin typing · Issue #18802 · tailwindlabs/tailwindcss: https://github.com/tailwindlabs/tailwindcss/issues/18802
    // Astro not working with latest TailwindCSS · Issue #14030 · withastro/astro: https://github.com/withastro/astro/issues/14030
    // @ts-expect-error
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    // uncomment during Starlight debugging and experimentation that requires node_modules code edits
    // optimizeDeps: {
    //   exclude: ['@astrojs/starlight'],
    // },
  },
});
