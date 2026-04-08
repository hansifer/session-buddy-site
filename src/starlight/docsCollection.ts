import { defineCollection } from 'astro:content';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const starlightDocsCollection = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});
