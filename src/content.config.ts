import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { ENABLE_STARLIGHT } from './docsConfig';

let docs;

if (ENABLE_STARLIGHT) {
  const { starlightDocsCollection } =
    await import('./starlight/docsCollection');

  docs = starlightDocsCollection;
} else {
  // interim docs
  docs = defineCollection({
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: './src/content/docs',
    }),
    schema: ({ image }) =>
      z
        .object({
          title: z.string(),
          description: z.string().optional(),
          slug: z.string().optional(),
          image: image().optional(),
          imageAlt: z.string().optional(),
        })
        .passthrough(),
  });
}

export const collections = {
  docs,
};
