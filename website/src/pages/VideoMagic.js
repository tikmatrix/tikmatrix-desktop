import Layout from '@theme/Layout';
import VideoMagicHeader from '@site/src/components/VideoMagicHeader';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';
import './VideoMagic.css'
import Translate, { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
export default function VideoMagic() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // 动画持续时间，单位毫秒
    });
  }, []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VideoMagic",
    "url": "https://tikmatrix.com/videomagic",
    "applicationCategory": "Social Media Management",
    "operatingSystem": "Windows",
    "screenshot": [
      "https://tikmatrix.com/img/video-magic-startup1.webp",
      "https://tikmatrix.com/img/video-magic-startup2.webp",
      "https://tikmatrix.com/img/video-magic-startup3.webp",
      "https://tikmatrix.com/img/video-magic-startup4.webp",
      "https://tikmatrix.com/img/video-magic-startup5.webp",
      "https://tikmatrix.com/img/video-magic-startup6.webp",
      "https://tikmatrix.com/img/video-magic-startup7.webp",
      "https://tikmatrix.com/img/video-magic-startup8.webp",
      "https://tikmatrix.com/img/video-magic-startup9.webp",
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "0",
      "description": translate({ message: 'Free' }),
      "availability": "https://schema.org/InStock"
    },
    "description": translate({ message: 'Video Magic is a Software for Batch Generating Unique Videos' }),
    "featureList": [
      translate({ message: 'Video download' }),
      translate({ message: 'Video unique' }),
      translate({ message: 'Recognize subtitles' }),
      translate({ message: 'Translate subtitles' }),
    ],
    "softwareVersion": "1.0.0",
    "downloadUrl": "https://tikmatrix.com/Download-VideoMagic",
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
      "logo": "https://tikmatrix.com/img/logo.webp",
    },
    "keywords": "video magic,video generation,video editing,subtitle translation,unique videos,social media videos",
    "datePublished": "2023-01-01",
    "applicationSubCategory": "Video Editing",
    "fileSize": "50MB",
    "requirements": "Windows 10 or later"
  }
  return (
    <Layout
      title={translate({ message: 'VideoMagic - Batch Generating Unique Videos' })}
      description="Batch Generating Unique Videos"
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta name="keywords" content="video magic, video generation, video editing, subtitle translation, unique videos, social media videos" />
        <meta property="og:title" content="VideoMagic - Software for Batch Generating Unique Videos" />
        <meta property="og:description" content="Video Magic is a Software for Batch Generating Unique Videos" />
        <meta property="og:image" content="https://tikmatrix.com/img/logo.webp" />
        <meta property="og:url" content="https://tikmatrix.com/videomagic" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VideoMagic - Software for Batch Generating Unique Videos" />
        <meta name="twitter:description" content="Video Magic is a Software for Batch Generating Unique Videos" />
        <meta name="twitter:image" content="https://tikmatrix.com/img/logo.webp" />
        <link rel="canonical" href="https://tikmatrix.com/videomagic" />
      </Head>
      <VideoMagicHeader />
      <main>
      </main>
    </Layout>
  );
}
