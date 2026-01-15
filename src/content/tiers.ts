import type { Tier } from '@/types';

export const tiers = [
  {
    name: 'Starter',
    description: 'Ideal for individuals with basic needs.',
    emphasize: false,
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      // wrap
      'All core features',
      'Local storage for collections',
      'Community support',
    ],
  },
  {
    name: 'Standard',
    description: 'Perfect for small teams and growing businesses.',
    emphasize: true,
    priceMonthly: 3.99,
    priceYearly: 39.99,
    features: [
      'All core features',
      'Cloud storage for up to 2,000 collections',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    description:
      'The best choice for professionals seeking enhanced capabilities.',
    emphasize: false,
    priceMonthly: 5.99,
    priceYearly: 59.99,
    features: [
      'All core features',
      'Unlimited cloud storage for collections',
      'Priority email support',
      'Multi-user license (up to 5 users)',
    ],
  },
] as const satisfies Tier[];
