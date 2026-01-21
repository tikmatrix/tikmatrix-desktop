import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="私たちについて"
            description="TikMatrixについてもっと知る - 私たちは誰か、私たちの使命とビジョン">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>私たちについて</h1>

                    <h2>会社概要</h2>
                    <p>TikMatrixは、米国ワイオミング州に登録されているTikMatrix LLCによって開発されています。設立以来、企業やコンテンツクリエイターがオンラインでの影響力を最大化できるよう、革新的なソーシャルメディアマーケティングツールの開発に取り組んできました。</p>

                    <h2>私たちの使命</h2>
                    <p>私たちの使命は、あらゆる規模の企業がオンラインでの存在感を効率的に拡大できるよう、強力で使いやすいソーシャルメディアマーケティングツールを開発することです。先進的なマーケティング技術を誰もが利用できるようにすることを目指しています。</p>

                    <h2>私たちの製品</h2>
                    <p>当社のフラッグシップ製品であるTikMatrixは、プロフェッショナルなTikTokアカウント管理とマーケティングオートメーション向けに設計されています。また、他のプラットフォーム向けの補完ツールも提供しています：</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - TikTokアカウント管理とマーケティングのためのプロフェッショナルツール</li>
                        <li><strong>IgMatrix</strong> - Instagramマーケティングとアカウント管理ソリューション</li>
                        <li><strong><a href="https://v.tikmatrix.com" target="_blank" rel="noopener noreferrer">VideoMagic</a></strong> - 動画コンテンツの作成と最適化ツール</li>
                        <li><strong>YtMatrix</strong> - YouTubeチャンネルの成長と管理プラットフォーム</li>
                    </ul>

                    <h2>私たちの技術</h2>
                    <p>TikMatrixでは、信頼性が高く、効率的で安全なソーシャルメディアマーケティングツールを提供するために、最先端の技術を使用しています。私たちの開発チームは、製品の改善と業界の最新イノベーションの組み込みに継続的に取り組み、ユーザーが常に最高のマーケティングツールにアクセスできるようにしています。</p>

                    <h2>私たちの価値観</h2>
                    <p>私たちは以下を強く信じています：</p>
                    <ul>
                        <li><strong>イノベーション</strong> - 変化する市場ニーズに応えるために製品を継続的に改善</li>
                        <li><strong>信頼性</strong> - ツールの安定した安全な動作を保証</li>
                        <li><strong>アクセシビリティ</strong> - あらゆる規模の企業が先進的なマーケティングツールを利用できるようにする</li>
                        <li><strong>顧客の成功</strong> - ユーザーの成長と成果を優先</li>
                    </ul>

                    <h2>私たちに参加しましょう</h2>
                    <p>小規模ビジネスオーナー、コンテンツクリエイター、マーケティングプロフェッショナルのいずれであっても、TikMatrixは今日の競争の激しいソーシャルメディア環境で成功するために必要なツールを提供します。私たちのチームは、お客様のマーケティング目標の達成とオンラインでの存在感の拡大をサポートすることに尽力しています。</p>

                    <h2>お問い合わせ</h2>
                    <p>ご質問やサポートが必要ですか？いつでもお手伝いいたします！</p>
                    <p>メール: support@tikmatrix.com</p>
                    <p>コミュニティに参加: <a href="https://t.me/tikmatrix_agent_bot">Telegramサポートグループ</a></p>
                </div>
            </div>
        </Layout>
    );
}