import React, { useState } from 'react';
import Translate from '@docusaurus/Translate';

export default function IgMatrixFAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: <Translate>What is the difference between IgMatrix and TikMatrix?</Translate>,
            answer: (
                <Translate>
                    IgMatrix and TikMatrix share the same setup process and user interface. The main difference is that IgMatrix is specifically designed for Instagram automation, while TikMatrix is for TikTok. The script logic and available features are optimized for each respective platform.
                </Translate>
            )
        },
        {
            question: <Translate>Can I use the same tutorial for both IgMatrix and TikMatrix?</Translate>,
            answer: (
                <Translate>
                    Yes! The setup tutorial for IgMatrix is identical to TikMatrix. You can follow the TikMatrix documentation for installation, device connection, and basic configuration. Only the automation scripts will differ based on the platform.
                </Translate>
            )
        },
        {
            question: <Translate>Which scripts from TikMatrix are available in IgMatrix?</Translate>,
            answer: (
                <Translate>
                    Not all TikMatrix scripts are available in IgMatrix, as they are platform-specific. The exact list of available scripts can be found within the IgMatrix software interface after installation. Please refer to the actual features shown in your software.
                </Translate>
            )
        },
        {
            question: <Translate>Do I need separate licenses for IgMatrix and TikMatrix?</Translate>,
            answer: (
                <Translate>
                    Yes, IgMatrix and TikMatrix require separate licenses as they are different products optimized for different social media platforms. Each license is tied to specific software and cannot be used interchangeably.
                </Translate>
            )
        },
        {
            question: <Translate>Is the pricing the same as TikMatrix?</Translate>,
            answer: (
                <Translate>
                    IgMatrix follows a similar pricing structure to TikMatrix, but may have different rates. Please check our official pricing page or contact our support team for current IgMatrix pricing information.
                </Translate>
            )
        },
        {
            question: <Translate>Can I run both IgMatrix and TikMatrix on the same computer?</Translate>,
            answer: (
                <Translate>
                    You can install both IgMatrix and TikMatrix on the same computer, but they cannot run simultaneously due to runtime conflicts. You can only run one software at a time - either IgMatrix or TikMatrix.
                </Translate>
            )
        }
    ];

    return (
        <section id="faq" className="faq section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2><Translate>Frequently Asked Questions</Translate></h2>
                    <p>
                        <Translate>
                            Find answers to common questions about IgMatrix
                        </Translate>
                    </p>
                </div>

                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="accordion" id="faqAccordion">
                            {faqs.map((faq, index) => (
                                <div key={index} className="accordion-item mb-3">
                                    <h2 className="accordion-header">
                                        <button
                                            className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleAccordion(index)}
                                            aria-expanded={activeIndex === index}
                                        >
                                            <i className="bx bx-help-circle me-2"></i>
                                            {faq.question}
                                        </button>
                                    </h2>
                                    <div className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}>
                                        <div className="accordion-body">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-12 text-center">
                        <div className="support-box">
                            <h4><Translate>Still have questions?</Translate></h4>
                            <p>
                                <Translate>
                                    Our support team is here to help you with any IgMatrix-related questions or issues.
                                </Translate>
                            </p>
                            <a href="https://t.me/tikmatrix_agent_bot" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <i className="bx bxl-telegram"></i>
                                <Translate>Contact Support</Translate>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
