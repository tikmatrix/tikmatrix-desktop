import React from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function IgMatrixTutorial() {
    const { i18n } = useDocusaurusContext();
    const currentLocale = i18n.currentLocale;

    return (
        <section className="section-bg" id="tutorial">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>
                        <Translate>Setup Tutorial</Translate>
                    </h2>
                    <p>
                        <Translate>
                            Follow these steps to get started with IgMatrix
                        </Translate>
                    </p>
                </div>

                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="tutorial-content">
                            {/* 主要说明 */}
                            <div className="alert alert-info mb-4" role="alert">
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <i className="bx bx-info-circle" style={{ fontSize: '24px', color: '#0ea5e9' }}></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h5 className="alert-heading">
                                            <Translate>Important Notice</Translate>
                                        </h5>
                                        <p className="mb-2">
                                            <Translate>
                                                IgMatrix setup tutorial is identical to TikMatrix. The only difference is their script logic, so you can directly refer to the TikMatrix tutorial documentation.
                                            </Translate>
                                        </p>
                                        <p className="mb-0">
                                            <strong>
                                                <Translate>
                                                    Please download IgMatrix to view the script list directly. Currently, not all TikMatrix scripts are 100% supported in IgMatrix. Please refer to the actual features in the software.
                                                </Translate>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 教程步骤 */}
                            <div className="tutorial-steps">
                                <h4 className="mb-4">
                                    <Translate>Quick Setup Guide</Translate>
                                </h4>

                                <div className="step-item mb-4">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h5>
                                            <Translate>Download and Install</Translate>
                                        </h5>
                                        <p>
                                            <Translate>
                                                Download IgMatrix from our official website and follow the installation instructions.
                                            </Translate>
                                        </p>
                                        <a href="/Download-IgMatrix" className="btn btn-primary btn-sm">
                                            <i className="bx bx-download"></i>
                                            <Translate>Download IgMatrix</Translate>
                                        </a>
                                    </div>
                                </div>

                                <div className="step-item mb-4">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h5>
                                            <Translate>Follow TikMatrix Tutorial</Translate>
                                        </h5>
                                        <p>
                                            <Translate>
                                                Since the setup process is identical, please refer to our comprehensive TikMatrix documentation for detailed instructions on device connection, account management, and script configuration.
                                            </Translate>
                                        </p>
                                        <a href="/docs/intro" className="btn btn-outline-primary btn-sm">
                                            <i className="bx bx-book-open"></i>
                                            <Translate>View TikMatrix Tutorial</Translate>
                                        </a>
                                    </div>
                                </div>

                                <div className="step-item mb-4">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h5>
                                            <Translate>Check Available Scripts</Translate>
                                        </h5>
                                        <p>
                                            <Translate>
                                                After installation, open IgMatrix to view the complete list of available Instagram automation scripts. The script selection may differ from TikMatrix.
                                            </Translate>
                                        </p>
                                    </div>
                                </div>

                                <div className="step-item mb-4">
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h5>
                                            <Translate>Get Support</Translate>
                                        </h5>
                                        <p>
                                            <Translate>
                                                If you need help with IgMatrix-specific features or encounter any issues, our support team is ready to assist you.
                                            </Translate>
                                        </p>
                                        <a href="https://t.me/tikmatrix_agent_bot" target="_blank" rel="noopener noreferrer" className="btn btn-success btn-sm">
                                            <i className="bx bxl-telegram"></i>
                                            <Translate>Get Support</Translate>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* 功能对比 */}
                            <div className="feature-comparison mt-5">
                                <h4 className="mb-4">
                                    <Translate>Key Differences from TikMatrix</Translate>
                                </h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="comparison-card">
                                            <h6>
                                                <i className="bx bx-check-circle text-success"></i>
                                                <Translate>Same Setup Process</Translate>
                                            </h6>
                                            <ul className="list-unstyled">
                                                <li>• <Translate>Device connection</Translate></li>
                                                <li>• <Translate>Account management</Translate></li>
                                                <li>• <Translate>Basic configuration</Translate></li>
                                                <li>• <Translate>User interface</Translate></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="comparison-card">
                                            <h6>
                                                <i className="bx bx-cog text-primary"></i>
                                                <Translate>Different Script Logic</Translate>
                                            </h6>
                                            <ul className="list-unstyled">
                                                <li>• <Translate>Instagram-specific automation</Translate></li>
                                                <li>• <Translate>Different script availability</Translate></li>
                                                <li>• <Translate>Platform-optimized features</Translate></li>
                                                <li>• <Translate>Custom Instagram workflows</Translate></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 重要提醒 */}
                            <div className="alert alert-warning mt-4" role="alert">
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <i className="bx bx-error-circle" style={{ fontSize: '24px', color: '#f59e0b' }}></i>
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="alert-heading">
                                            <Translate>Important Reminder</Translate>
                                        </h6>
                                        <p className="mb-0">
                                            <Translate>
                                                Always check the actual features available in your IgMatrix software, as the script functionality may vary from TikMatrix. The software interface will show you exactly which automation scripts are available for Instagram.
                                            </Translate>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
