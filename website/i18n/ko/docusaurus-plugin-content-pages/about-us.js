import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="회사 소개"
            description="TikMatrix에 대해 더 알아보기 - 우리는 누구이며, 우리의 미션과 비전">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>회사 소개</h1>

                    <h2>회사 프로필</h2>
                    <p>TikMatrix는 미국 와이오밍주에 등록된 TikMatrix LLC에서 개발되었습니다. 설립 이래로 우리는 기업과 콘텐츠 제작자가 온라인 영향력을 극대화할 수 있도록 혁신적인 소셜 미디어 마케팅 도구를 만드는 데 전념해왔습니다.</p>

                    <h2>우리의 미션</h2>
                    <p>우리의 미션은 모든 규모의 기업이 온라인 존재감을 효율적으로 확장할 수 있도록 강력하고 사용하기 쉬운 소셜 미디어 마케팅 도구를 개발하는 것입니다. 우리는 첨단 마케팅 기술을 모든 사람이 이용할 수 있도록 만들기 위해 노력합니다.</p>

                    <h2>우리의 제품</h2>
                    <p>우리의 주력 제품인 TikMatrix는 전문적인 TikTok 계정 관리 및 마케팅 자동화를 위해 설계되었습니다. 또한 다른 플랫폼을 위한 보완 도구도 제공합니다:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - TikTok 계정 관리 및 마케팅을 위한 전문 도구</li>
                        <li><strong>IgMatrix</strong> - Instagram 마케팅 및 계정 관리 솔루션</li>
                        <li><strong>VideoMagic</strong> - 비디오 콘텐츠 제작 및 최적화 도구</li>
                        <li><strong>YtMatrix</strong> - YouTube 채널 성장 및 관리 플랫폼</li>
                    </ul>

                    <h2>우리의 기술</h2>
                    <p>TikMatrix에서는 신뢰할 수 있고 효율적이며 안전한 소셜 미디어 마케팅 도구를 제공하기 위해 최첨단 기술을 사용합니다. 우리의 개발 팀은 제품을 개선하고 최신 업계 혁신을 통합하기 위해 지속적으로 노력하여 사용자가 항상 최고의 마케팅 도구에 액세스할 수 있도록 합니다.</p>

                    <h2>우리의 가치관</h2>
                    <p>우리는 다음을 강력히 믿습니다:</p>
                    <ul>
                        <li><strong>혁신</strong> - 변화하는 시장 요구를 충족하기 위해 제품을 지속적으로 개선</li>
                        <li><strong>신뢰성</strong> - 도구의 안정적이고 안전한 작동 보장</li>
                        <li><strong>접근성</strong> - 모든 규모의 기업이 첨단 마케팅 도구를 이용할 수 있도록 함</li>
                        <li><strong>고객 성공</strong> - 사용자의 성장과 성과를 우선시</li>
                    </ul>

                    <h2>함께하세요</h2>
                    <p>소규모 비즈니스 소유자, 콘텐츠 제작자 또는 마케팅 전문가이든, TikMatrix는 오늘날의 경쟁적인 소셜 미디어 환경에서 성공하는 데 필요한 도구를 제공합니다. 우리 팀은 귀하의 마케팅 목표 달성과 온라인 존재감 확장을 지원하는 데 전념하고 있습니다.</p>

                    <h2>문의하기</h2>
                    <p>질문이 있거나 도움이 필요하신가요? 언제든지 연락주세요!</p>
                    <p>이메일: support@tikmatrix.com</p>
                    <p>커뮤니티 참여: <a href="https://t.me/tikmatrix_agent_bot">Telegram 지원 그룹</a></p>
                </div>
            </div>
        </Layout>
    );
}