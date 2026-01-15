import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="关于我们"
            description="了解更多关于 TikMatrix - 我们是谁，我们的使命和愿景">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>关于我们</h1>

                    <h2>公司简介</h2>
                    <p>TikMatrix 由美国怀俄明州注册公司 TikMatrix LLC 开发。自成立以来，我们一直致力于创建创新的社交媒体营销工具，帮助企业和内容创作者最大化他们的线上影响力。</p>

                    <h2>我们的使命</h2>
                    <p>我们的使命是开发强大、易用的社交媒体营销工具，帮助各种规模的企业高效地发展其线上影响力。我们努力使先进的营销技术变得人人可及。</p>

                    <h2>我们的产品</h2>
                    <p>我们的旗舰产品 TikMatrix 专为专业 TikTok 账户管理和营销自动化而设计。我们还为其他平台提供补充工具：</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - 专业 TikTok 账户管理和营销工具</li>
                        <li><strong>IgMatrix</strong> - Instagram 营销和账户管理解决方案</li>
                        <li><strong>VideoMagic</strong> - 视频内容创作和优化工具</li>
                        <li><strong>YtMatrix</strong> - YouTube 频道增长和管理平台</li>
                    </ul>

                    <h2>我们的技术</h2>
                    <p>在 TikMatrix，我们利用尖端技术提供可靠、高效和安全的社交媒体营销工具。我们的开发团队不断努力改进产品并融入最新的行业创新，确保我们的用户始终能够获得最佳的营销工具。</p>

                    <h2>我们的价值观</h2>
                    <p>我们坚信：</p>
                    <ul>
                        <li><strong>创新</strong> - 不断改进我们的产品以满足不断变化的市场需求</li>
                        <li><strong>可靠性</strong> - 确保我们的工具持续稳定和安全运行</li>
                        <li><strong>普惠性</strong> - 让各种规模的企业都能使用先进的营销工具</li>
                        <li><strong>客户成功</strong> - 优先考虑用户的成长和成就</li>
                    </ul>

                    <h2>加入我们</h2>
                    <p>无论您是小企业主、内容创作者还是营销专业人士，TikMatrix 都能提供您在当今竞争激烈的社交媒体环境中取得成功所需的工具。我们的团队致力于帮助您实现营销目标并扩大线上影响力。</p>

                    <h2>联系我们</h2>
                    <p>有问题或需要帮助？我们随时为您服务！</p>
                    <p>电子邮件：support@tikmatrix.com</p>
                    <p>加入我们的社区：<a href="https://t.me/tikmatrix_agent_bot">Telegram 支持群组</a></p>
                </div>
            </div>
        </Layout>
    );
} 