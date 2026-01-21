import clsx from 'clsx';
import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import './pricing.css';

const plans = [
    {
        id: 'free',
        name: translate({ message: 'Free' }),
        description: translate({ message: 'Free users can connect unlimited devices and use all basic features except automation tasks' }),
        price: 0,
        device_count: 0,
        includes: [
            translate({ message: 'Unlimited device connections' }),
            translate({ message: 'All basic features (automation excluded)' }),
            translate({ message: 'Automation tasks disabled' }),
            translate({ message: 'Community support' })
        ]
    },
    {
        id: 'starter',
        name: translate({ message: 'Starter' }),
        description: translate({ message: 'For individuals and small teams' }),
        price: 29,
        device_count: 5,
        includes: [
            translate({ message: 'Up to 5 concurrent automation tasks' }),
            translate({ message: 'Unlimited device connections' }),
            translate({ message: 'All features included' }),
            translate({ message: 'Dedicated ticket support' })
        ]
    },
    {
        id: 'pro',
        name: translate({ message: 'Pro' }),
        description: translate({ message: 'For professionals and small businesses' }),
        price: 59,
        device_count: 20,
        includes: [
            translate({ message: 'Up to 20 concurrent automation tasks' }),
            translate({ message: 'Unlimited device connections' }),
            translate({ message: 'All features included' }),
            translate({ message: 'Local REST API access (Pro+)' }),
            translate({ message: 'Dedicated ticket support' })
        ]
    },
    {
        id: 'team',
        name: translate({ message: 'Team' }),
        description: translate({ message: 'For growing teams and companies' }),
        price: 99,
        device_count: 50,
        includes: [
            translate({ message: 'Up to 50 concurrent automation tasks' }),
            translate({ message: 'Unlimited device connections' }),
            translate({ message: 'All features included' }),
            translate({ message: 'Local REST API access (Pro+)' }),
            translate({ message: 'Dedicated ticket support' })
        ]
    },
    {
        id: 'business',
        name: translate({ message: 'Business' }),
        description: translate({ message: 'For large enterprises' }),
        price: 149,
        device_count: 100,
        includes: [
            translate({ message: 'Up to 100 concurrent automation tasks' }),
            translate({ message: 'Unlimited device connections' }),
            translate({ message: 'All features included' }),
            translate({ message: 'Local REST API access (Pro+)' }),
            translate({ message: 'Dedicated ticket support' })
        ]
    }
];

export default function PricingPage() {
    const [billing, setBilling] = useState('monthly'); // 'monthly' or 'yearly'
    const [showCompare, setShowCompare] = useState(false);
    const annualDiscount = 0.3; // 30% discount for yearly (configurable)

    const formatPrice = (monthly) => {
        if (monthly === 0) return translate({ message: 'Free' });
        if (billing === 'monthly') return `$${monthly}`;
        const annual = Math.round(monthly * 12 * (1 - annualDiscount));
        return `$${annual}`;
    };

    const billingLabel = (monthly) => {
        if (monthly === 0) return null;
        return billing === 'monthly'
            ? translate({ message: 'Per Month' })
            : translate({ message: `Per Year (Save ${Math.round(annualDiscount * 100)}%)` });
    };

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="section-title">
                    <h2>
                        <Translate>Pricing</Translate>
                    </h2>
                    <p>
                        <Translate>Flexible plans for everyone. Enjoy 30% off with annual billing!</Translate>
                    </p>

                    <div className="billingToggle" role="tablist" aria-label="Billing period">
                        <button
                            className={clsx('toggleBtn', billing === 'monthly' && 'active')}
                            onClick={() => setBilling('monthly')}
                            aria-pressed={billing === 'monthly'}
                        >
                            <Translate>Monthly</Translate>
                        </button>
                        <button
                            className={clsx('toggleBtn', billing === 'yearly' && 'active')}
                            onClick={() => setBilling('yearly')}
                            aria-pressed={billing === 'yearly'}
                        >
                            <Translate>Yearly (Save 30%)</Translate>
                        </button>
                    </div>
                </div>

                <div className="row">
                    {plans.map((plan, idx) => (
                        <div
                            className={clsx('box', plan.id === 'free' && 'free', idx === 2 && 'featured')}
                            data-aos="fade-up"
                            data-aos-delay={100 * (idx + 1)}
                            key={plan.id}
                        >
                            {idx === 2 && <span className="badge">{translate({ message: 'Most popular' })}</span>}
                            <h3>{plan.name}</h3>
                            <div className="plan-desc">{plan.description}</div>
                            <h4>
                                {plan.price === 0 ? (
                                    <span>{translate({ message: 'Free' })}</span>
                                ) : (
                                    <>
                                        <span className="priceBig" key={billing + plan.id}>{formatPrice(plan.price)}</span>
                                        <span className="priceNote">{billingLabel(plan.price)}</span>
                                    </>
                                )}
                            </h4>
                            <ul>
                                {plan.includes.map((item, i) => (
                                    <li key={i}><i className="bx bx-check"></i> <span>{item}</span></li>
                                ))}
                            </ul>
                            <a href={`/Download?plan=${plan.id}`} className="get-started-btn" data-plan={plan.id}>
                                {plan.price === 0 ? (
                                    <Translate>Start for free</Translate>
                                ) : (
                                    <Translate>Subscribe</Translate>
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="compareWrapper">
                    <button className="compareToggle" onClick={() => setShowCompare(s => !s)}>
                        {showCompare ? translate({ message: 'Hide feature comparison' }) : translate({ message: 'Compare features' })}
                    </button>

                    {showCompare && (
                        <div className="compareTable" data-aos="fade-up" data-aos-delay={200}>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        {plans.map(p => <th key={p.id}>{p.name}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{translate({ message: 'Device support' })}</td>
                                        {plans.map(p => <td key={p.id}>{p.device_count === 0 ? translate({ message: 'Unlimited' }) : p.device_count}</td>)}
                                    </tr>
                                    <tr>
                                        <td>{translate({ message: 'Automation tasks' })}</td>
                                        {plans.map(p => <td key={p.id}>{p.includes.some(i => i.includes('concurrent automation')) || p.device_count > 0 ? '✔' : '—'}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Local API short description section */}
                <div className="localApiCard" data-aos="fade-up" data-aos-delay={250}>
                    <h3>
                        <Translate>Local API</Translate>
                    </h3>
                    <p>
                        <Translate>
                            Pro, Team and Business users can use the local RESTful API to programmatically manage tasks and automate workflows. See the docs for details.
                        </Translate>
                    </p>
                    <p>
                        <a className="docsLink" href="/docs/api/local-api">
                            {translate({ message: 'Read Local API docs' })}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
