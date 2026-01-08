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

export type Tier = {
  name: string;
  description: string;
  emphasize: boolean;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
};

export type Testimonial = {
  name: string;
  quote: string;
  role?: string;
  company?: string;
  image?: string;
};
