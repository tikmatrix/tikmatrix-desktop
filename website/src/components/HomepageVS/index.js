import './styles.css';
import Translate, { translate } from '@docusaurus/Translate';

const FEATURES = [
    {
        id: 'real_devices',
        icon: '📱',
        title: translate({ id: 'homepage.vs.card.realDevices.title', message: 'Real device operations' }),
        desc: translate({ id: 'homepage.vs.card.realDevices.desc', message: 'Each task runs on real devices to ensure behavior and results that match human operation.' }),
    },
    {
        id: 'automation',
        icon: '⚡',
        title: translate({ id: 'homepage.vs.card.automation.title', message: 'Professional TikTok automation' }),
        desc: translate({ id: 'homepage.vs.card.automation.desc', message: 'Batch operations, scripted workflows and scheduled posts to cover full TikTok business needs.' }),
    },
    {
        id: 'low_risk',
        icon: '🛡',
        title: translate({ id: 'homepage.vs.card.lowRisk.title', message: 'Low risk' }),
        desc: translate({ id: 'homepage.vs.card.lowRisk.desc', message: 'Simulates real interactions to reduce ban risks and protect account safety.' }),
    },
    {
        id: 'plug_and_play',
        icon: '🚀',
        title: translate({ id: 'homepage.vs.card.plug.title', message: 'Plug & play' }),
        desc: translate({ id: 'homepage.vs.card.plug.desc', message: 'Ready to run out of the box — no heavy configuration required.' }),
    },
    {
        id: 'no_dev',
        icon: '🔧',
        title: translate({ id: 'homepage.vs.card.nodev.title', message: 'No coding required' }),
        desc: translate({ id: 'homepage.vs.card.nodev.desc', message: 'Powerful built-in features with drag-and-drop visual flows to create complex tasks.' }),
    },
    {
        id: 'analytics',
        icon: '📊',
        title: translate({ id: 'homepage.vs.card.analytics.title', message: 'Visual analytics' }),
        desc: translate({ id: 'homepage.vs.card.analytics.desc', message: 'Monitor task status and account performance in real time.' }),
    },
];

export default function HomepageVS() {
    return (
        <section id="vs" className="vsSection">
            <div className="vsContainer" data-aos="fade-up">
                <div className="vsHeader">
                    <h2>{translate({ id: 'homepage.vs.title', message: 'Why TikMatrix?' })}</h2>
                    <p className="vsSubtitle">{translate({ id: 'homepage.vs.subtitle', message: 'A professional solution built for TikTok automation' })}</p>
                </div>

                <div className="vsGrid">
                    {FEATURES.map((f, idx) => (
                        <article
                            key={f.id}
                            className="vsCard"
                            data-aos="fade-up"
                            data-aos-delay={idx * 80}
                        >
                            <div className="vsIcon" aria-hidden>
                                {f.icon}
                            </div>
                            <h3 className="vsCardTitle">{f.title}</h3>
                            <p className="vsCardDesc">{f.desc}</p>
                            <div className="vsCardFooter">
                                <a className="vsLearnMore" href="#features">{translate({ id: 'homepage.vs.card.cta', message: 'Learn more' })}</a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="vsCtaBar" data-aos="fade-up" data-aos-delay={400}>
                    <div className="vsCtaText">{translate({ id: 'homepage.vs.cta.text', message: 'Want to boost TikTok automation efficiency?' })}</div>
                    <a className="vsCtaButton" href="/Download?software=TikMatrix">{translate({ id: 'homepage.vs.cta.button', message: 'Try TikMatrix →' })}</a>
                </div>
            </div>
        </section>
    );
}