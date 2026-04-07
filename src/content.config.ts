import { ENABLE_STARLIGHT } from '../astro.config.mjs';
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = ENABLE_STARLIGHT
  ? {
      docs: defineCollection({
        loader: docsLoader(),
        schema: docsSchema(),
      }),
    }
  : null;
