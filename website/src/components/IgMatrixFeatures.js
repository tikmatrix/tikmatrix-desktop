import React from 'react';
import Translate from '@docusaurus/Translate';

export default function IgMatrixFeatures() {
    const features = [
        {
            icon: 'bx-mobile-alt',
            title: <Translate>Multi-Device Control</Translate>,
            description: <Translate>Control multiple Instagram accounts across different Android devices simultaneously</Translate>
        },
        {
            icon: 'bx-bot',
            title: <Translate>Instagram Automation</Translate>,
            description: <Translate>Automate posting, following, commenting, and engagement activities on Instagram</Translate>
        },
        {
            icon: 'bx-shield-alt-2',
            title: <Translate>Safe & Secure</Translate>,
            description: <Translate>Built with safety mechanisms to protect your Instagram accounts from suspension</Translate>
        },
        {
            icon: 'bx-time',
            title: <Translate>Smart Scheduling</Translate>,
            description: <Translate>Schedule your Instagram activities with intelligent timing algorithms</Translate>
        },
        {
            icon: 'bx-support',
            title: <Translate>24/7 Support</Translate>,
            description: <Translate>Get dedicated support from our expert team whenever you need help</Translate>
        }
    ];

    return (
        <section id="features" className="features">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2><Translate>IgMatrix Features</Translate></h2>
                    <p>
                        <Translate>
                            Powerful Instagram automation tools designed for professional marketers and businesses
                        </Translate>
                    </p>
                </div>

                <div className="row">
                    {features.map((feature, index) => (
                        <div key={index} className="col-lg-4 col-md-6 d-flex align-items-stretch mb-4" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                            <div className="feature-box">
                                <div className="icon">
                                    <i className={`bx ${feature.icon}`}></i>
                                </div>
                                <h4>{feature.title}</h4>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row mt-5">
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="feature-img">
                            <img src="/img/igmatrix-startup1.webp" className="img-fluid" alt="IgMatrix Interface" />
                        </div>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <h3><Translate>Why Choose IgMatrix?</Translate></h3>
                        <p className="fst-italic">
                            <Translate>
                                IgMatrix brings the same powerful automation capabilities of TikMatrix to Instagram,
                                helping you scale your Instagram marketing efforts efficiently and safely.
                            </Translate>
                        </p>
                        <ul>
                            <li>
                                <i className="bx bx-check-double"></i>
                                <Translate>Same reliable technology as TikMatrix</Translate>
                            </li>
                            <li>
                                <i className="bx bx-check-double"></i>
                                <Translate>Instagram-optimized automation scripts</Translate>
                            </li>
                            <li>
                                <i className="bx bx-check-double"></i>
                                <Translate>Multi-language support (English, Chinese, Russian)</Translate>
                            </li>
                            <li>
                                <i className="bx bx-check-double"></i>
                                <Translate>Professional phone farm management</Translate>
                            </li>
                            <li>
                                <i className="bx bx-check-double"></i>
                                <Translate>Advanced safety mechanisms</Translate>
                            </li>
                        </ul>
                        <p>
                            <Translate>
                                Start automating your Instagram marketing today with IgMatrix and experience
                                the same professional-grade tools that thousands of marketers trust.
                            </Translate>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
