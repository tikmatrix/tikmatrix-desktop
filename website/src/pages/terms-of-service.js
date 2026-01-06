import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Terms of Service"
            description="TikMatrix Terms of Service - Rules and guidelines for using our platform">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Terms of Service</h1>
                    <p>Last updated: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the TikMatrix website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

                    <h2>2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials on TikMatrix's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul>
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or for any public display</li>
                        <li>Attempt to reverse engineer any software contained on TikMatrix's website</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>
                    <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by TikMatrix at any time.</p>

                    <h2>3. Services and Subscription</h2>
                    <p>TikMatrix provides software tools for TikTok account management and marketing automation. Access to these services may require a subscription or one-time payment. By subscribing to our services, you agree to:</p>
                    <ul>
                        <li>During the trial period, you can cancel the subscription at any time. If the subscription is not canceled, it will automatically convert to a paid subscription.</li>
                        <li>Provide accurate and complete billing information</li>
                        <li>Pay all charges at the rates in effect when the charges are incurred</li>
                        <li>Not use the services for any illegal purposes or in violation of any applicable laws or regulations</li>
                    </ul>

                    <h2>4. User Conduct</h2>
                    <p>When using our services, you agree not to:</p>
                    <ul>
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Distribute malware or engage in other harmful activities</li>
                        <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                        <li>Use our services in any manner that could damage, disable, overburden, or impair our services</li>
                    </ul>

                    <h2>5. Intellectual Property</h2>
                    <p>The TikMatrix name, logo, software, and content are the exclusive property of TikMatrix and its licensors. Our services and all content included in or made available through our services are protected by intellectual property laws.</p>

                    <h2>6. Disclaimer</h2>
                    <p>The materials on TikMatrix's website and the services provided are supplied "as is". TikMatrix makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation, implied warranties of merchantability or fitness for a particular purpose.</p>

                    <h2>7. Limitation of Liability</h2>
                    <p>In no event shall TikMatrix or its suppliers be liable for any damages arising out of the use or inability to use the materials or services, even if TikMatrix has been notified of the possibility of such damage.</p>

                    <h2>8. Governing Law</h2>
                    <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TikMatrix is established, without regard to its conflict of law provisions.</p>

                    <h2>9. Changes to Terms</h2>
                    <p>TikMatrix reserves the right to modify these Terms at any time. We will notify users of any changes by updating the "Last updated" date of these Terms. Your continued use of our website and services after any changes indicates your acceptance of the modified Terms.</p>

                    <h2>10. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 