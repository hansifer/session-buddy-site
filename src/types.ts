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
  popular?: boolean;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
};
