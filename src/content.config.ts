import { defineCollection } from 'astro:content';

// comment out if interim docs enabled
// import { starlightDocsCollection } from './starlight/docsCollection';

// comment out if starlight docs enabled
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// comment out if interim docs enabled
// const docs = starlightDocsCollection;

// comment out if starlight docs enabled
const docs = defineCollection({
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

export const collections = {
  docs,
};
