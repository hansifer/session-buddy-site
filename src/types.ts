import type { JSX } from 'react';

export type Article = {
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  date: Date;
  content: JSX.Element | string;
  author: string;
};
