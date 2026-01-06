import clsx from 'clsx';
import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import './pricing.css';

const plans = [
    {
        id: 'free',
        name: translate({
            id: 'pricing.free.name',
            message: 'Free',
            description: 'Free plan name'
        }),
        description: translate({
            id: 'pricing.free.description',
            message: 'Free users can connect unlimited devices and use all basic features except automation tasks',
            description: 'Free plan description'
        }),
        price: 0,
        device_count: 0,
        includes: [
            translate({
                id: 'pricing.unlimited_devices',
                message: 'Unlimited device connections',
                description: 'Unlimited device connections text'
            }),
            translate({
                id: 'pricing.free.all_free_features',
                message: 'All basic features (automation excluded)',
                description: 'Free plan basic features'
            }),
            translate({
                id: 'pricing.free.automation_disabled',
                message: 'Automation tasks disabled',
                description: 'Automation disabled text'
            }),
            translate({
                id: 'pricing.free.community_support',
                message: 'Community support',
                description: 'Community support text'
            })
        ]
    },
    {
        id: 'starter',
        name: translate({
            id: 'pricing.starter.name',
            message: 'Starter',
            description: 'Starter plan name'
        }),
        description: translate({
            id: 'pricing.starter.description',
            message: 'For individuals and small teams',
            description: 'Starter plan description'
        }),
        price: 29,
        device_count: 5,
        includes: [
            translate({
                id: 'pricing.starter.concurrent_tasks',
                message: 'Up to 5 concurrent automation tasks',
                description: 'Starter plan concurrent tasks'
            }),
            translate({
                id: 'pricing.unlimited_devices',
                message: 'Unlimited device connections',
                description: 'Unlimited device connections text'
            }),
            translate({
                id: 'pricing.all_features',
                message: 'All features included',
                description: 'All features included text'
            }),
            translate({
                id: 'pricing.ticket_support',
                message: 'Dedicated ticket support',
                description: 'Dedicated ticket support text'
            })
        ]
    },
    {
        id: 'pro',
        name: translate({
            id: 'pricing.pro.name',
            message: 'Pro',
            description: 'Pro plan name'
        }),
        description: translate({
            id: 'pricing.pro.description',
            message: 'For professionals and small businesses',
            description: 'Pro plan description'
        }),
        price: 59,
        device_count: 20,
        includes: [
            translate({
                id: 'pricing.pro.concurrent_tasks',
                message: 'Up to 20 concurrent automation tasks',
                description: 'Pro plan concurrent tasks'
            }),
            translate({
                id: 'pricing.unlimited_devices',
                message: 'Unlimited device connections',
                description: 'Unlimited device connections text'
            }),
            translate({
                id: 'pricing.all_features',
                message: 'All features included',
                description: 'All features included text'
            }),
            translate({
                id: 'pricing.local_api.support',
                message: 'Local REST API access (Pro+)',
                description: 'Local API support in plan includes'
            }),
            translate({
                id: 'pricing.ticket_support',
                message: 'Dedicated ticket support',
                description: 'Dedicated ticket support text'
            })
        ]
    },
    {
        id: 'team',
        name: translate({
            id: 'pricing.team.name',
            message: 'Team',
            description: 'Team plan name'
        }),
        description: translate({
            id: 'pricing.team.description',
            message: 'For growing teams and companies',
            description: 'Team plan description'
        }),
        price: 99,
        device_count: 50,
        includes: [
            translate({
                id: 'pricing.team.concurrent_tasks',
                message: 'Up to 50 concurrent automation tasks',
                description: 'Team plan concurrent tasks'
            }),
            translate({
                id: 'pricing.unlimited_devices',
                message: 'Unlimited device connections',
                description: 'Unlimited device connections text'
            }),
            translate({
                id: 'pricing.all_features',
                message: 'All features included',
                description: 'All features included text'
            }),
            translate({
                id: 'pricing.local_api.support',
                message: 'Local REST API access (Pro+)',
                description: 'Local API support in plan includes'
            }),
            translate({
                id: 'pricing.ticket_support',
                message: 'Dedicated ticket support',
                description: 'Dedicated ticket support text'
            })
        ]
    },
    {
        id: 'business',
        name: translate({
            id: 'pricing.business.name',
            message: 'Business',
            description: 'Business plan name'
        }),
        description: translate({
            id: 'pricing.business.description',
            message: 'For large enterprises',
            description: 'Business plan description'
        }),
        price: 149,
        device_count: 100,
        includes: [
            translate({
                id: 'pricing.business.concurrent_tasks',
                message: 'Up to 100 concurrent automation tasks',
                description: 'Business plan concurrent tasks'
            }),
            translate({
                id: 'pricing.unlimited_devices',
                message: 'Unlimited device connections',
                description: 'Unlimited device connections text'
            }),
            translate({
                id: 'pricing.all_features',
                message: 'All features included',
                description: 'All features included text'
            }),
            translate({
                id: 'pricing.local_api.support',
                message: 'Local REST API access (Pro+)',
                description: 'Local API support in plan includes'
            }),
            translate({
                id: 'pricing.ticket_support',
                message: 'Dedicated ticket support',
                description: 'Dedicated ticket support text'
            })
        ]
    }
];

export default function PricingPage() {
    const [billing, setBilling] = useState('monthly'); // 'monthly' or 'yearly'
    const [showCompare, setShowCompare] = useState(false);
    const annualDiscount = 0.3; // 30% discount for yearly (configurable)

    const formatPrice = (monthly) => {
        if (monthly === 0) return translate({ id: 'pricing.free_label', message: 'Free' });
        if (billing === 'monthly') return `$${monthly}`;
        const annual = Math.round(monthly * 12 * (1 - annualDiscount));
        return `$${annual}`;
    };

    const billingLabel = (monthly) => {
        if (monthly === 0) return null;
        return billing === 'monthly'
            ? translate({ id: 'pricing.per_month', message: 'Per Month' })
            : translate({ id: 'pricing.per_year', message: `Per Year (Save ${Math.round(annualDiscount * 100)}%)` });
    };

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="section-title">
                    <h2>
                        <Translate
                            id="pricing.title"
                            description="Pricing section title">
                            Pricing
                        </Translate>
                    </h2>
                    <p>
                        <Translate
                            id="pricing.subtitle"
                            description="Pricing section subtitle">
                            Flexible plans for everyone. Enjoy 30% off with annual billing!
                        </Translate>
                    </p>

                    <div className="billingToggle" role="tablist" aria-label="Billing period">
                        <button
                            className={clsx('toggleBtn', billing === 'monthly' && 'active')}
                            onClick={() => setBilling('monthly')}
                            aria-pressed={billing === 'monthly'}
                        >
                            <Translate id="pricing.toggle.monthly" message="Monthly" />
                        </button>
                        <button
                            className={clsx('toggleBtn', billing === 'yearly' && 'active')}
                            onClick={() => setBilling('yearly')}
                            aria-pressed={billing === 'yearly'}
                        >
                            <Translate id="pricing.toggle.yearly" message="Yearly (Save 30%)" />
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
                            {idx === 2 && <span className="badge">{translate({ id: 'pricing.badge.popular', message: 'Most popular' })}</span>}
                            <h3>{plan.name}</h3>
                            <div className="plan-desc">{plan.description}</div>
                            <h4>
                                {plan.price === 0 ? (
                                    <span>{translate({ id: 'pricing.free_label', message: 'Free' })}</span>
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
                                    <Translate id="pricing.cta.free" message="Start for free" />
                                ) : (
                                    <Translate id="pricing.cta.pay" message="Subscribe" />
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                <div className="compareWrapper">
                    <button className="compareToggle" onClick={() => setShowCompare(s => !s)}>
                        {showCompare ? translate({ id: 'pricing.compare.hide', message: 'Hide feature comparison' }) : translate({ id: 'pricing.compare.show', message: 'Compare features' })}
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
                                        <td>{translate({ id: 'pricing.compare.devices', message: 'Device support' })}</td>
                                        {plans.map(p => <td key={p.id}>{p.device_count === 0 ? translate({ id: 'pricing.unlimited_devices_short', message: 'Unlimited' }) : p.device_count}</td>)}
                                    </tr>
                                    <tr>
                                        <td>{translate({ id: 'pricing.compare.automation', message: 'Automation tasks' })}</td>
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
                        <Translate id="pricing.local_api.title" description="Local API title">Local API</Translate>
                    </h3>
                    <p>
                        <Translate id="pricing.local_api.description" description="Local API short description">
                            Pro, Team and Business users can use the local RESTful API to programmatically manage tasks and automate workflows. See the docs for details.
                        </Translate>
                    </p>
                    <p>
                        <a className="docsLink" href="/docs/api/local-api">
                            {translate({ id: 'pricing.local_api.link_text', message: 'Read Local API docs' })}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
