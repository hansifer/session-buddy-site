import starlight from '@astrojs/starlight';

type Sidebar = Parameters<typeof starlight>[0]['sidebar'];

// use explicit sidebar config because starlight's sidebar autogen does not handle groups well (index.md sidebar.order is not reliable, label comes from folder name, etc)
export const sidebar: Sidebar = [
  {
    label: 'Getting started',
    autogenerate: {
      directory: 'docs',
    },
  },
  {
    label: 'Tabs',
    autogenerate: {
      directory: 'tabs',
    },
  },
  {
    label: 'Bookmarks',
    autogenerate: {
      directory: 'bookmarks',
    },
  },
  {
    label: 'History',
    autogenerate: {
      directory: 'history',
    },
  },
  {
    label: 'Other features',
    autogenerate: {
      directory: 'other-features',
    },
  },
  {
    label: 'Configuration',
    autogenerate: {
      directory: 'configuration',
    },
  },
  {
    label: 'Data safeguards',
    autogenerate: {
      directory: 'data-safeguards',
    },
  },
  {
    label: 'Troubleshooting',
    autogenerate: {
      directory: 'troubleshooting',
    },
  },
  {
    label: 'Reference',
    autogenerate: {
      directory: 'reference',
    },
  },
  {
    slug: 'faq',
  },
  {
    slug: 'releases',
  },
  {
    slug: 'roadmap',
  },
  {
    slug: 'older-versions',
  },
  {
    label: 'Privacy',
    slug: 'privacy',
  },
  {
    slug: 'terms',
  },
];
