import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="隐私政策"
            description="TikMatrix 隐私政策 - 我们如何收集、使用和保护您的数据">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>隐私政策</h1>
                    <p>最后更新日期: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. 引言</h2>
                    <p>欢迎访问 TikMatrix（以下简称"我们"、"我们的"或"本公司"）。我们致力于保护您的个人信息和隐私权。本隐私政策解释了当您访问我们的网站或使用我们的服务时，我们如何收集、使用、披露和保护您的信息。</p>

                    <h2>2. 我们收集的信息</h2>
                    <p>我们可能会收集网站和服务用户的几类信息，包括：</p>
                    <ul>
                        <li><strong>个人信息：</strong>当您注册我们的服务或与我们沟通时提供的姓名、电子邮件地址、电话号码和其他标识符。</li>
                        <li><strong>技术信息：</strong>当您访问我们的网站时的 IP 地址、浏览器类型、操作系统和其他技术详情。</li>
                        <li><strong>使用信息：</strong>您如何与我们的网站和服务互动，包括使用的功能和花费的时间。</li>
                    </ul>

                    <h2>3. 我们如何使用您的信息</h2>
                    <p>我们可能将收集的信息用于各种目的，包括：</p>
                    <ul>
                        <li>提供、运营和维护我们的服务</li>
                        <li>改进和个性化您的体验</li>
                        <li>就更新、支持和促销与您沟通</li>
                        <li>分析使用模式以增强我们的服务</li>
                        <li>防止欺诈并确保安全</li>
                    </ul>

                    <h2>4. 信息共享和披露</h2>
                    <p>我们可能在以下情况下共享您的信息：</p>
                    <ul>
                        <li><strong>服务提供商：</strong>与帮助我们运营业务和提供服务的第三方。</li>
                        <li><strong>法律要求：</strong>当法律要求或为保护我们的权利或用户安全时。</li>
                        <li><strong>业务转让：</strong>与合并、收购或资产出售相关的情况。</li>
                    </ul>

                    <h2>5. 数据安全</h2>
                    <p>我们实施适当的安全措施来保护您的个人信息。但是，没有任何通过互联网传输或电子存储的方法是 100% 安全的，我们不能保证绝对的安全性。</p>

                    <h2>6. 您的权利</h2>
                    <p>根据您所在的位置，您可能对您的个人信息拥有某些权利，包括：</p>
                    <ul>
                        <li>访问您的个人信息</li>
                        <li>更正不准确的个人信息</li>
                        <li>删除您的个人信息</li>
                        <li>反对某些处理活动</li>
                        <li>数据可携带性</li>
                    </ul>

                    <h2>7. 儿童隐私</h2>
                    <p>我们的服务不面向 16 岁以下的个人。我们不会故意收集儿童的个人信息。</p>

                    <h2>8. 本隐私政策的变更</h2>
                    <p>我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策并更新"最后更新日期"来通知您任何更改。</p>

                    <h2>9. 联系我们</h2>
                    <p>如果您对本隐私政策有任何疑问，请联系我们：</p>
                    <p>电子邮件：support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 