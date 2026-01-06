import Layout from '@theme/Layout';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';
import './IgMatrix.css'
import Translate, { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
import IgMatrixHeader from '@site/src/components/IgMatrixHeader';
import IgMatrixTutorial from '@site/src/components/IgMatrixTutorial';
import IgMatrixFeatures from '@site/src/components/IgMatrixFeatures';
import IgMatrixFAQ from '@site/src/components/IgMatrixFAQ';
export default function IgMatrix() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // 动画持续时间，单位毫秒
    });
  }, []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "IgMatrix",
    "url": "https://tikmatrix.com/igmatrix",
    "applicationCategory": "Social Media Management",
    "operatingSystem": "Windows",
    "screenshot": [
      "https://tikmatrix.com/img/igmatrix-startup1.webp",
      "https://tikmatrix.com/img/igmatrix-startup2.webp",
      "https://tikmatrix.com/img/igmatrix-startup3.webp",
    ],

    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "0",
      "description": translate({ message: 'Free' }),
    },
    "description": translate({ message: 'IgMatrix is a Instagram android phonefarm batch control tool' }),
    "featureList": [
      translate({ message: 'Phone screen mirroring to a computer' }),
      translate({ message: 'Automatic account nurturing' }),
      translate({ message: 'Automatic posting' }),
      translate({ message: 'Automatic following' }),
      translate({ message: 'Automatic commenting' }),
    ],
    "softwareVersion": "1.0.0",
    "downloadUrl": "https://tikmatrix.com/Download-IgMatrix",
    "supportUrl": "https://t.me/tikmatrix_agent_bot",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1000000",
      "bestRating": "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Organization",
      "name": "TikMatrix",
      "url": "https://tikmatrix.com",
      "logo": "https://tikmatrix.com/img/igmatrix_logo.webp",
    },
  }
  return (
    <Layout>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta name="keywords" content="Instagram Phone Farm Batch Control Tool, Instagram Phone Farm, Instagram Phone Farm Batch Control, Instagram Phone Farm Batch Control Tool, IgMatrix Tutorial, Instagram Automation" />
        <meta property="og:title" content="IgMatrix - Instagram Phone Farm Batch Control Tool with Complete Tutorial" />
        <meta property="og:description" content="IgMatrix is a powerful Instagram phone farm batch control tool. Follow our comprehensive setup tutorial identical to TikMatrix documentation. Multi-language support: English, Chinese, Russian." />
        <meta property="og:image" content="https://tikmatrix.com/img/logo.webp" />
        <meta property="og:url" content="https://tikmatrix.com/igmatrix" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IgMatrix - Instagram Phone Farm Batch Control Tool with Complete Tutorial" />
        <meta name="twitter:description" content="IgMatrix is a powerful Instagram phone farm batch control tool. Follow our comprehensive setup tutorial identical to TikMatrix documentation." />
        <meta name="twitter:image" content="https://tikmatrix.com/img/logo.webp" />
        <link rel="canonical" href="https://tikmatrix.com/igmatrix" />
      </Head>
      <IgMatrixHeader />
      <main>
        <IgMatrixTutorial />
        <IgMatrixFeatures />
        <IgMatrixFAQ />
      </main>
    </Layout>
  );
}
