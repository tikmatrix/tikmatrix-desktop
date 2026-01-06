import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import './Testimonials.css';

const testimonials = [
    {
        stars: 5,
        text: translate({
            id: 'testimonials.user1.text',
            message: "TikMatrix is a lifesaver for our studio! We can control so many phones at once, and the automation is super powerful. Posting and account farming are so much easier now. TikTok anti-detection really works—our posts get more natural traffic than before.",
            description: 'First testimonial text'
        }),
        user: "StudioOps",
        usage: translate({
            id: 'testimonials.user1.usage',
            message: "1 year",
            description: 'First user usage duration'
        }),
        avatar: "/img/user-1.webp",
    },
    {
        stars: 5,
        text: translate({
            id: 'testimonials.user2.text',
            message: "After using TikMatrix, our ad team's efficiency shot up. The automation scripts save us tons of manual work, and accounts stay safe—no bans so far. Perfect for agencies like us!",
            description: 'Second testimonial text'
        }),
        user: "AdTeam Lee",
        usage: translate({
            id: 'testimonials.user2.usage',
            message: "10 months",
            description: 'Second user usage duration'
        }),
        avatar: "/img/user-2.webp",
    },
    {
        stars: 5,
        text: translate({
            id: 'testimonials.user3.text',
            message: "Controlling 100 phones at once is a game changer. Batch operations are super convenient, and our TikTok posts get more organic reach. Great for overseas marketing, and the price is really fair!",
            description: 'Third testimonial text'
        }),
        user: "MarketPro",
        usage: translate({
            id: 'testimonials.user3.usage',
            message: "6 months",
            description: 'Third user usage duration'
        }),
        avatar: "/img/user-3.webp",
    },
    {
        stars: 5,
        text: translate({
            id: 'testimonials.user4.text',
            message: "Tried other tools before, but TikMatrix is the most worry-free. Automation and anti-ban are both reliable. Perfect for marketing teams that need high-efficiency batch operations.",
            description: 'Fourth testimonial text'
        }),
        user: "Ken from Marketing",
        usage: translate({
            id: 'testimonials.user4.usage',
            message: "8 months",
            description: 'Fourth user usage duration'
        }),
        avatar: "/img/user-4.webp",
    },
];

export default function Testimonials() {
    return (
        <section className="testimonials-section">
            <h2 className="testimonials-title">
                <Translate
                    id="testimonials.title"
                    description="Testimonials section title">
                    Real User Testimonials
                </Translate>
            </h2>
            <p className="testimonials-subtitle">
                <Translate
                    id="testimonials.subtitle"
                    description="Testimonials section subtitle">
                    What TikMatrix Users Say
                </Translate>
            </p>
            <div className="testimonials-list">
                {testimonials.map((t, i) => (
                    <div className="testimonial-card" key={i}>
                        <div className="testimonial-stars">
                            {Array.from({ length: t.stars }).map((_, idx) => (
                                <span key={idx} className="star">★</span>
                            ))}
                            {t.stars < 5 && Array.from({ length: 5 - t.stars }).map((_, idx) => (
                                <span key={idx} className="star inactive">★</span>
                            ))}
                        </div>
                        <div className="testimonial-text">{t.text}</div>
                        <div className="testimonial-user">
                            <img className="testimonial-avatar" src={t.avatar} alt={t.user} />
                            <span className="testimonial-username">{t.user}</span>
                        </div>
                        <div className="testimonial-usage">
                            <Translate
                                id="testimonials.usage_label"
                                description="Usage label">
                                Usage
                            </Translate>: {t.usage}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
