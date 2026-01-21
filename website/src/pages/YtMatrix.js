import Layout from '@theme/Layout';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';
import './YtMatrix.css'
import Translate, { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
export default function YtMatrix() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // 动画持续时间，单位毫秒
    });
  }, []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YtMatrix",
    "url": "https://tikmatrix.com/igmatrix",
    "applicationCategory": "Social Media Management",
    "operatingSystem": "Windows",
    "screenshot": [
    ],

    "offers": {
      "@type": "Offer",
      "priceCurrency": "USDT",
      "price": "0",
      "description": translate({ message: 'Free' }),
    },
    "description": translate({ message: 'YtMatrix is a Youtebe android phonefarm batch control tool' }),
    "featureList": [
      translate({ message: 'Phone screen mirroring to a computer' }),
      translate({ message: 'Automatic account nurturing' }),
      translate({ message: 'Automatic posting' }),
      translate({ message: 'Automatic following' }),
      translate({ message: 'Automatic commenting' }),
    ],
    "softwareVersion": "1.0.0",
    "downloadUrl": "https://api.niostack.com/front-api/download-ytmatrix",
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
      "logo": "https://tikmatrix.com/img/ytmatrix_logo.webp",
    },
  }
  return (
    <Layout title={translate({ message: 'YtMatrix' })} description="YtMatrix is a Youtebe android phonefarm batch control tool">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Head>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <h1><Translate>YtMatrix</Translate></h1>
        <h3><Translate>YtMatrix is a Youtebe android phonefarm batch control tool</Translate></h3>
        <p><Translate>YtMatrix is coming soon!</Translate></p>
        <a href="//t.me/tikmatrix_agent_bot" target="_blank">
          <i className="bx bxl-telegram"></i>
          <Translate>Join Telegram Group</Translate>
        </a>
        <img src="/img/ytmatrix_logo.webp" alt="YtMatrix Logo" style={{ width: '200px', marginTop: '20px' }} />
      </main>
    </Layout>
  );
}
