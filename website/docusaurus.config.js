// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TikMatrix - Professional TikTok Account Management & Marketing Tool for Windows & Mac',
  tagline: 'Streamline your Android TikTok phone farm with advanced batch control and marketing automation',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://tikmatrix.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tikmatrix', // Usually your GitHub org/user name.
  projectName: 'tikmatrix-desktop', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',
  onBrokenAnchors: 'ignore',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'ru'],
    localeConfigs: {
      en: {
        htmlLang: 'en',
      },
      'zh-Hans': {
        htmlLang: 'zh-Hans',
      },
      ru: {
        htmlLang: 'ru',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 200

        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-60Y51L6N5Y',
          anonymizeIP: true,
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/startup1.webp?v=4',
      navbar: {
        title: '',
        logo: {
          alt: 'TikMatrix Logo',
          src: 'https://tikmatrix.com/img/tikmatrix_logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },

          {
            to: '/Download-TikMatrix',
            position: 'left',
            label: 'Download',
          },
          {
            href: '/#pricing',
            position: 'left',
            label: 'Pricing',
          },
          {
            href: '/#features',
            position: 'left',
            label: 'Features',
          },
          {
            href: '/#contact',
            position: 'left',
            label: 'Contact',
          }, {
            to: '/advertising',
            position: 'left',
            label: 'Advertising',
          },
          // {
          //   href: '/IgMatrix',
          //   position: 'right',
          //   label: 'IgMatrix',
          // },
          {
            href: 'https://v.tikmatrix.com',
            position: 'right',
            label: 'VideoMagic',
          },
          // {
          //   href: 'https://ai.tikmatrix.com',
          //   position: 'right',
          //   label: 'AI Search',
          // },
          {
            type: 'localeDropdown',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
              {
                label: 'Recent posts',
                to: '/blog',
              },
              {
                label: 'Archive posts',
                to: '/blog/archive',
              }

            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/tikmatrix/tikmatrix-desktop',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/tikmatrix_agent_bot',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/mSZ5b8tDfn',
              },
              {
                label: 'X',
                href: 'https://x.com/TikMatrix',
              },
              {
                label: 'Youtube',
                href: 'https://youtube.com/@tikmatrix',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'TikMatrix',
                to: '//tikmatrix.com',
              },
              {
                label: 'IgMatrix',
                to: '//igmatrix.com',
              },
              {
                label: 'About Us',
                to: '/about-us',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy-policy',
              },
              {
                label: 'Terms of Service',
                to: '/terms-of-service',
              }
            ],
          }, {
            title: 'Advertising',
            items: [
              {
                label: 'View All Advertising',
                to: '/advertising',
              },
            ],
          }
        ],
        copyright: `Copyright © 2023 - ${new Date().getFullYear()} TikMatrix LLC. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      metadata: [
        { name: 'keywords', content: 'TikMatrix, TikTok Phone Farm, TikTok Marketing, TikTok Automation, Social Media Marketing, TikTok Account Management, Batch Control, Marketing Software, TikTok Growth Tool, Windows and Mac Support' },
        { name: 'description', content: 'TikMatrix is a professional marketing software designed for TikTok phone farms on Windows and Mac. Manage multiple accounts, automate posting, and scale your TikTok marketing with ease. Zero account suspension rate.' },
        { name: 'author', content: 'TikMatrix' },
        { property: 'og:title', content: 'TikMatrix - Professional TikTok Account Management & Marketing Tool for Windows & Mac' },
        { property: 'og:description', content: 'Streamline your Android TikTok phone farm with advanced batch control and marketing automation. Manage accounts, automate posting, and maintain 0% suspension rate.' },
        { property: 'og:image', content: 'https://tikmatrix.com/img/tikmatrix_logo.png' },
        { property: 'og:url', content: 'https://tikmatrix.com/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@TikMatrix' },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },

    }),
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://tikmatrix.com/',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'SoftwareApplication',
        'name': 'TikMatrix',
        'description': 'Professional marketing software designed for TikTok phone farms on Windows and Mac. Advanced batch control and marketing automation with zero account suspension rate.',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Windows, macOS',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'TikMatrix, LLC.',
          'logo': 'https://tikmatrix.com/img/tikmatrix_logo.png'
        }
      }),
    },
  ],
  scripts: [
    // {
    //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6160068729774314',
    //   async: true,
    //   crossorigin: 'anonymous'
    // },

  ],
  clientModules: [
    // require.resolve('./src/clientModules/detectBrowserLanguage.js'),
  ],
};

export default config;
