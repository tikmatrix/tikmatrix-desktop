import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './index.css';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';
import ImageSlider from '../ImageSlider';


export default function HomepageHeader({
    title = null,
    subtitle = null,
    primaryCta = { text: null, to: '/Download-TikMatrix' },
    secondaryCta = { text: null, to: 'docs/intro' },
    rightVideo = null,
    rightPoster = '/img/hero.png',
}) {
    const { siteConfig } = useDocusaurusContext();

    // fall back to existing defaults if props not provided
    const H1 = title || translate({
        id: 'homepage.header.defaultTitle',
        message: 'Professional Instagram Account Management & Marketing Tool for Windows & Mac',
        description: 'Default header title (English)'
    });

    const H2 = subtitle || translate({
        id: 'homepage.header.defaultSubtitle',
        message: 'Streamline your Android Instagram phone farm with advanced batch control and marketing automation',
        description: 'Default header subtitle (English)'
    });

    return (
        <header id="start" className='hero shadow--lw' >
            <div className="row header-row">
                <div className='col col--6 header-content'>
                    <Heading as="h1" className="hero__title">
                        {H1}
                    </Heading>
                    <p className="heroSubtitle">
                        {H2}
                    </p>
                    <div className="heroCtas">
                        <Link to={primaryCta.to} className="button button--primary" target={primaryCta.target || '_self'}>
                            {primaryCta.text || translate({ id: 'homepage.header.cta.primary', message: 'Download IgMatrix', description: 'Primary CTA' })}
                        </Link>

                        <Link to={secondaryCta.to} className="button button--secondary">
                            {secondaryCta.text || translate({ id: 'homepage.header.cta.secondary', message: 'Tutorial', description: 'Secondary CTA' })}
                        </Link>
                    </div>
                </div>
                <div className="col col--6 heroRight" data-aos="zoom-in">
                    {rightVideo ? (
                        <video className="heroVideo" autoPlay muted loop playsInline preload="auto" poster={rightPoster}>
                            <source src={rightVideo} type="video/mp4" />
                            您的浏览器不支持视频播放。
                        </video>
                    ) : (
                        <ImageSlider />
                    )}
                </div>
            </div>
        </header>
    );
}
