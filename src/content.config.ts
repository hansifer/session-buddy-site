// ----- comment out below if interim docs enabled -----

// import { starlightDocsCollection } from './starlight/docsCollection';

// export const collections = {
//   docs: starlightDocsCollection,
// };

// ----- comment out below if starlight docs enabled -----

import { defineCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export type InterimDocsEntry = CollectionEntry<'interimDocs'>;

const interimDocs = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/docs',
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().optional(),
        image: image().optional(),
        imageAlt: z.string().optional(),
        interimVisible: z.boolean().optional(),
      })
      .passthrough(),
});

export const collections = {
  interimDocs,
};
