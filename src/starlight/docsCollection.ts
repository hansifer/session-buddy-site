import { defineCollection } from 'astro:content';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const starlightDocsCollection = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema(),
  }),
};
