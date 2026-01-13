import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './advertising.module.css';

const advertising = [
    {
        titleId: 'advertising.buy.hardware.title',
        title: 'NiaoZun Shop',
        url: 'http://www.niaozun.shop?cid=934ec2fe',
        descriptionId: 'advertising.buy.hardware.description',
        description: 'Professional hardware equipment for phone farming and automation',
        categoryId: 'advertising.category.hardware',
        category: 'Hardware'
    },
    {
        titleId: 'advertising.buy.accounts.title',
        title: 'AccsMarket',
        url: 'https://accsmarket.com/en/?ref=802647',
        descriptionId: 'advertising.buy.accounts.description',
        description: 'Professional social media accounts marketplace',
        categoryId: 'advertising.category.accounts',
        category: 'Accounts'
    },
    {
        titleId: 'advertising.buy.accounts.leadsmm.title',
        title: 'LeadsSMM - Buy Accounts',
        url: 'https://leadsmm.com/ref/xgene',
        descriptionId: 'advertising.buy.accounts.leadsmm.description',
        description: 'Premium social media accounts provider with high-quality accounts',
        categoryId: 'advertising.category.accounts',
        category: 'Accounts'
    },
    {
        titleId: 'advertising.tiktok.user.finder.title',
        title: 'TikTok User Finder',
        url: 'https://user.tikmatrix.com',
        descriptionId: 'advertising.tiktok.user.finder.description',
        description: 'Find and analyze TikTok users and their data',
        categoryId: 'advertising.category.analytics',
        category: 'Analytics'
    },
    // VPS Providers
    {
        titleId: 'advertising.vps.lisahost.title',
        title: 'LisaHost',
        url: 'https://lisahost.com/aff.php?aff=1886',
        descriptionId: 'advertising.vps.lisahost.description',
        description: 'Reliable VPS hosting services for automation projects',
        categoryId: 'advertising.category.vps',
        category: 'VPS'
    },
    {
        titleId: 'advertising.vps.uuuvps.title',
        title: 'UUUVPS',
        url: 'https://uuuvps.hk/aff.php?aff=189',
        descriptionId: 'advertising.vps.uuuvps.description',
        description: 'High-performance VPS hosting with global locations',
        categoryId: 'advertising.category.vps',
        category: 'VPS'
    },
    // Proxy IP Providers
    {
        titleId: 'advertising.proxy.thordata.title',
        title: 'Thordata',
        url: 'https://dashboard.thordata.com/register?invitation_code=S63414A4',
        descriptionId: 'advertising.proxy.thordata.description',
        description: 'Best Residential Proxies - Stable & Reliable & Cost-effective Sign up for a free 1GB trial',
        categoryId: 'advertising.category.proxy',
        category: 'Proxy'
    },
    {
        titleId: 'advertising.proxy.proxycheap.title',
        title: 'Proxy-Cheap',
        url: 'https://app.proxy-cheap.com/r/jY5Tfd',
        descriptionId: 'advertising.proxy.proxycheap.description',
        description: 'Affordable proxy solutions for various use cases',
        categoryId: 'advertising.category.proxy',
        category: 'Proxy'
    }
];

export default function Advertising() {
    return (
        <Layout
            title="Advertising & Partners"
            description="Recommended advertising tools and services for social media automation and management"
        >
            <Head>
                <meta name="description" content="Recommended advertising tools and services for social media automation and management" />
                <meta name="keywords" content="social media tools, automation tools, TikTok tools, phone farming tools" />
            </Head>

            <div className="container margin-vert--lg">
                <div className="row">
                    <div className="col col--12">
                        <header className={styles.header}>
                            <h1 className={styles.title}>
                                <Translate id="advertising.page.title">
                                    Advertising & Partners
                                </Translate>
                            </h1>
                            <p className={styles.subtitle}>
                                <Translate id="advertising.page.subtitle">
                                    Recommended advertising tools and services to enhance your social media automation experience
                                </Translate>
                            </p>
                        </header>
                    </div>
                </div>

                <div className="row">
                    <div className="col col--12">
                        <div className={styles.disclaimer}>
                            <div className={styles.disclaimerIcon}>⚠️</div>
                            <div className={styles.disclaimerContent}>
                                <h3>
                                    <Translate id="advertising.disclaimer.title">
                                        Important Disclaimer
                                    </Translate>
                                </h3>
                                <p>
                                    <Translate id="advertising.disclaimer.content">
                                        The recommendations and links below are to external websites and services that are not owned or operated by TikMatrix.
                                        We provide these links for your convenience only. TikMatrix does not endorse, guarantee, or assume responsibility for
                                        the accuracy, completeness, or usefulness of any information, products, or services offered by these third-party websites.
                                        Please use your own judgment when interacting with external services.
                                    </Translate>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>                <div className="row">
                    {advertising.map((ad, index) => (
                        <div key={index} className="col col--6 margin-bottom--lg">
                            <div className={styles.toolCard}>
                                <div className={styles.toolHeader}>
                                    <div className={styles.categoryBadge}>
                                        <Translate id={ad.categoryId}>
                                            {ad.category}
                                        </Translate>
                                    </div>
                                </div>
                                <div className={styles.toolContent}>
                                    <h3 className={styles.toolTitle}>
                                        <Translate id={ad.titleId}>
                                            {ad.title}
                                        </Translate>
                                    </h3>
                                    <p className={styles.toolDescription}>
                                        <Translate id={ad.descriptionId}>
                                            {ad.description}
                                        </Translate>
                                    </p>
                                    <a
                                        href={ad.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.toolButton}
                                    >
                                        <Translate id="advertising.visit.button">
                                            Visit Website
                                        </Translate>
                                        <span className={styles.externalIcon}>↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row margin-top--xl">
                    <div className="col col--12">
                        <div className={styles.backToHome}>
                            <a href="/" className={styles.backButton}>
                                ← <Translate id="tools.back.home">Back to Home</Translate>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
