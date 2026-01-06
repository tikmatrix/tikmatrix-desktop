import Layout from '@theme/Layout';
import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageVS from '@site/src/components/HomepageVS';
import TechnicalAdvantages from '@site/src/components/TechnicalAdvantages';
import PricingPage from '@site/src/components/PricingPage';
import FrequentlyAsked from '@site/src/components/FrequentlyAsked';
import ContactPage from '@site/src/components/ContactPage';
import Testimonials from '@site/src/components/Testimonials';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';
import './index.css'
import Translate, { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';


export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // 动画持续时间，单位毫秒
    });
  }, []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TikMatrix",
    "url": "https://tikmatrix.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows, macOS",
    "screenshot": [
      "https://tikmatrix.com/img/startup1.webp",
      "https://tikmatrix.com/img/startup2.webp",
      "https://tikmatrix.com/img/startup3.webp",
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "0",
      "description": translate({ message: 'Free' }),
    },
    "description": translate({ message: 'Professional TikTok account management and marketing tool designed for Android phone farms on Windows and Mac. Automate posting, following, and grow your TikTok presence with zero account suspension rate.' }),
    "featureList": [
      translate({ message: 'Phone screen mirroring to a computer' }),
      translate({ message: 'Automatic login' }),
      translate({ message: 'Automatic account nurturing' }),
      translate({ message: 'Automatic posting' }),
      translate({ message: 'Automatic following' }),
      translate({ message: 'Automatic commenting' }),
      translate({ message: 'Batch account management' }),
      translate({ message: 'Performance analytics' }),
    ],
    "softwareVersion": "2.1.9",
    "downloadUrl": "https://tikmatrix.com/Download?software=TikMatrix",
    "supportUrl": "https://t.me/tikmatrix_agent_bot",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "230809",
      "bestRating": "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Organization",
      "name": "TikMatrix",
      "url": "https://tikmatrix.com",
      "logo": "https://tikmatrix.com/img/logo.webp",
    },
    "keywords": "TikTok Marketing, TikTok Automation, Phone Farm, Social Media Growth, TikTok Management, TikTok Phone Farm, TikTok Matrix, TikMatrix, Windows, Mac",
    "datePublished": "2025-03-07",
  }
  return (
    <Layout>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta name="keywords" content="TikMatrix, TikTok Phone Farm, TikTok Marketing, TikTok Automation, Social Media Growth, TikTok Management, Android Phone Farm, Windows and Mac Support" />
        <meta property="og:title" content="TikMatrix - Professional TikTok Account Management & Marketing Tool for Windows & Mac" />
        <meta property="og:description" content="Professional TikTok account management and marketing tool designed for Android phone farms. Automate posting, following, commenting with advanced batch control and maintain zero suspension rate." />
        <meta property="og:image" content="https://tikmatrix.com/img/logo.webp" />
        <meta property="og:url" content="https://tikmatrix.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TikMatrix - Professional TikTok Account Management & Marketing Tool for Windows & Mac" />
        <meta name="twitter:description" content="Professional TikTok account management and marketing tool designed for Android phone farms. Automate posting, following, commenting with advanced batch control and maintain zero suspension rate." />
        <meta name="twitter:image" content="https://tikmatrix.com/img/logo.webp" />
        <link rel="canonical" href="https://tikmatrix.com" />
      </Head>
      <HomepageHeader
        title={translate({ id: 'homepage.header.title', message: 'TikTok Automation starts here', description: 'Homepage H1 in English' })}
        subtitle={translate({ id: 'homepage.header.subtitle', message: 'Run devices at scale, automate tasks, schedule posts, and smartly nurture accounts — TikMatrix makes your TikTok operations 100% automated.', description: 'Homepage subtitle in English' })}
        primaryCta={{ text: translate({ id: 'homepage.header.cta.download', message: 'Download Now', description: 'Primary CTA in English' }), to: '/Download-TikMatrix' }}
        secondaryCta={{ text: translate({ id: 'homepage.header.cta.features', message: 'See features →', description: 'Secondary CTA in English' }), to: '#features' }}
        rightVideo="/img/hero.mp4"
        rightPoster="/img/hero.png"
      />
      <main>
        <HomepageVS />
        <HomepageFeatures />
        <TechnicalAdvantages />
        <PricingPage />
        {/* <FrequentlyAsked /> */}
        <ContactPage />
        <Testimonials />

      </main>
    </Layout>
  );
}
