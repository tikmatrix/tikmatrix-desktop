import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Privacy Policy"
            description="TikMatrix Privacy Policy - How we collect, use, and protect your data">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Introduction</h2>
                    <p>Welcome to TikMatrix ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

                    <h2>2. Information We Collect</h2>
                    <p>We may collect several types of information from and about users of our website and services, including:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and other identifiers you provide when registering for our services or communicating with us.</li>
                        <li><strong>Technical Information:</strong> IP address, browser type, operating system, and other technical details when you visit our website.</li>
                        <li><strong>Usage Information:</strong> How you interact with our website and services, including features used and time spent.</li>
                    </ul>

                    <h2>3. How We Use Your Information</h2>
                    <p>We may use the information we collect for various purposes, including:</p>
                    <ul>
                        <li>Providing, operating, and maintaining our services</li>
                        <li>Improving and personalizing your experience</li>
                        <li>Communicating with you about updates, support, and promotions</li>
                        <li>Analyzing usage patterns to enhance our services</li>
                        <li>Preventing fraud and ensuring security</li>
                    </ul>

                    <h2>4. Information Sharing and Disclosure</h2>
                    <p>We may share your information in the following situations:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> With third parties that help us operate our business and deliver services.</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights or the safety of users.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
                    </ul>

                    <h2>5. Data Security</h2>
                    <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

                    <h2>6. Your Rights</h2>
                    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                    <ul>
                        <li>Accessing your personal information</li>
                        <li>Correcting inaccurate personal information</li>
                        <li>Deleting your personal information</li>
                        <li>Objecting to certain processing activities</li>
                        <li>Data portability</li>
                    </ul>

                    <h2>7. Children's Privacy</h2>
                    <p>Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children.</p>

                    <h2>8. Changes to This Privacy Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

                    <h2>9. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 