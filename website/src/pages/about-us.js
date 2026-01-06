import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="About Us"
            description="Learn more about TikMatrix: who we are, our mission, and our vision."
        >
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>About Us</h1>

                    <h2>Our Company</h2>
                    <p>TikMatrix is developed by TikMatrix LLC, registered in Wyoming, USA. Since our founding, we have focused on creating innovative social media marketing tools to help businesses and creators maximize their online presence.</p>

                    <h2>Our Mission</h2>
                    <p>Our mission is to develop powerful, user-friendly social media marketing tools that empower businesses of all sizes to grow efficiently and effectively. We strive to make advanced marketing technology accessible to everyone.</p>

                    <h2>Our Products</h2>
                    <p>Our flagship product, TikMatrix, is designed for professional TikTok account management and marketing automation. We also offer tools for other platforms:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> – Professional TikTok account management and marketing tool</li>
                        <li><strong>IgMatrix</strong> – Instagram marketing and account management solution</li>
                        <li><strong>VideoMagic</strong> – Video content creation and optimization tool</li>
                        <li><strong>YtMatrix</strong> – YouTube channel growth and management platform</li>
                    </ul>

                    <h2>Our Technology</h2>
                    <p>We leverage cutting-edge technology to provide reliable, efficient, and secure tools for social media marketing. Our team continuously improves our products and incorporates the latest industry innovations, ensuring users always have access to the best tools available.</p>

                    <h2>Our Values</h2>
                    <p>We believe in:</p>
                    <ul>
                        <li><strong>Innovation</strong> – Constantly improving our products to meet evolving market needs</li>
                        <li><strong>Reliability</strong> – Ensuring our tools perform consistently and securely</li>
                        <li><strong>Accessibility</strong> – Making advanced marketing tools available to businesses of all sizes</li>
                        <li><strong>Customer Success</strong> – Prioritizing our users' growth and achievement</li>
                    </ul>

                    <h2>Join Us</h2>
                    <p>Whether you're a business owner, content creator, or marketing professional, TikMatrix has the tools you need to succeed in today's social media landscape. Our team is committed to helping you achieve your marketing goals and grow your online presence.</p>

                    <h2>Contact Us</h2>
                    <p>Have questions or need assistance? We're here to help!</p>
                    <p>Email: support@tikmatrix.com</p>
                    <p>Join our community: <a href="https://t.me/tikmatrix_agent_bot">Telegram Channel</a></p>
                </div>
            </div>
        </Layout>
    );
}