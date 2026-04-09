import starlight from '@astrojs/starlight';

type Sidebar = Parameters<typeof starlight>[0]['sidebar'];

// use explicit sidebar config because starlight's sidebar autogen does not handle groups well (index.md sidebar.order is not reliable, label comes from folder name, etc)
const sidebar: Sidebar = [
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
    collapsed: false,
  },
  {
    label: 'Reference',
    autogenerate: {
      directory: 'reference',
    },
    collapsed: false,
  },
  {
    slug: 'faq',
  },
  {
    label: 'Releases',
    autogenerate: {
      directory: 'releases',
    },
  },
  {
    slug: 'roadmap',
  },
  {
    slug: 'older-versions',
  },
  {
    label: 'Privacy',
    slug: 'privacy-policy',
  },
  {
    slug: 'terms',
  },
];

export function createStarlightIntegration() {
  return starlight({
    title: 'Session Buddy',
    tableOfContents: false,
    components: {
      Head: './src/components/CustomStarlightHead.astro',
      PageFrame: './src/components/CustomStarlightPageFrame.astro',
      Search: './src/components/CustomStarlightSearch.astro',
      MobileTableOfContents: './src/components/CustomStarlightMobileTOC.astro',
      MobileMenuToggle:
        './src/components/CustomStarlightMobileMenuToggle.astro',
      MobileMenuFooter:
        './src/components/CustomStarlightMobileMenuFooter.astro',
    },
    customCss: [
      './src/styles/starlight.css',
      '@fontsource/inter',
      '@fontsource/inter/500.css',
      '@fontsource/inter/600.css',
      '@fontsource/inter/700.css',
      '@fontsource/inter/800.css',
      '@fontsource/inter/900.css',
    ],
    sidebar,
  });
}
