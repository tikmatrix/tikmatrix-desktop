import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-us.module.css';

export default function AboutUs() {
    return (
        <Layout
            title="Về Chúng Tôi"
            description="Tìm hiểu thêm về TikMatrix - Chúng tôi là ai, sứ mệnh và tầm nhìn của chúng tôi">
            <div className="container">
                <div className={styles.aboutContent}>
                    <h1>Về Chúng Tôi</h1>

                    <h2>Giới Thiệu Công Ty</h2>
                    <p>TikMatrix được phát triển bởi TikMatrix LLC, một công ty đăng ký tại bang Wyoming, Hoa Kỳ. Kể từ khi thành lập, chúng tôi luôn cam kết tạo ra các công cụ marketing truyền thông xã hội sáng tạo, giúp doanh nghiệp và nhà sáng tạo nội dung tối đa hóa ảnh hưởng trực tuyến của họ.</p>

                    <h2>Sứ Mệnh Của Chúng Tôi</h2>
                    <p>Sứ mệnh của chúng tôi là phát triển các công cụ marketing truyền thông xã hội mạnh mẽ và dễ sử dụng, giúp các doanh nghiệp thuộc mọi quy mô phát triển ảnh hưởng trực tuyến một cách hiệu quả. Chúng tôi nỗ lực làm cho công nghệ marketing tiên tiến trở nên dễ tiếp cận với tất cả mọi người.</p>

                    <h2>Sản Phẩm Của Chúng Tôi</h2>
                    <p>Sản phẩm hàng đầu của chúng tôi, TikMatrix, được thiết kế đặc biệt cho quản lý tài khoản TikTok chuyên nghiệp và tự động hóa marketing. Chúng tôi cũng cung cấp các công cụ bổ sung cho các nền tảng khác:</p>
                    <ul>
                        <li><strong>TikMatrix</strong> - Công cụ quản lý tài khoản và marketing TikTok chuyên nghiệp</li>
                        <li><strong>IgMatrix</strong> - Giải pháp marketing và quản lý tài khoản Instagram</li>
                        <li><strong>VideoMagic</strong> - Công cụ sáng tạo và tối ưu hóa nội dung video</li>
                        <li><strong>YtMatrix</strong> - Nền tảng phát triển và quản lý kênh YouTube</li>
                    </ul>

                    <h2>Công Nghệ Của Chúng Tôi</h2>
                    <p>Tại TikMatrix, chúng tôi tận dụng công nghệ tiên tiến để cung cấp các công cụ marketing truyền thông xã hội đáng tin cậy, hiệu quả và an toàn. Đội ngũ phát triển của chúng tôi không ngừng nỗ lực cải tiến sản phẩm và tích hợp những đổi mới mới nhất trong ngành, đảm bảo người dùng của chúng tôi luôn có quyền truy cập vào các công cụ marketing tốt nhất.</p>

                    <h2>Giá Trị Của Chúng Tôi</h2>
                    <p>Chúng tôi tin tưởng vào:</p>
                    <ul>
                        <li><strong>Đổi Mới</strong> - Liên tục cải tiến sản phẩm của chúng tôi để đáp ứng nhu cầu thị trường thay đổi</li>
                        <li><strong>Độ Tin Cậy</strong> - Đảm bảo các công cụ của chúng tôi hoạt động ổn định và an toàn liên tục</li>
                        <li><strong>Khả Năng Tiếp Cận</strong> - Làm cho các công cụ marketing tiên tiến có thể sử dụng được cho các doanh nghiệp thuộc mọi quy mô</li>
                        <li><strong>Thành Công Của Khách Hàng</strong> - Ưu tiên sự phát triển và thành tựu của người dùng</li>
                    </ul>

                    <h2>Tham Gia Với Chúng Tôi</h2>
                    <p>Cho dù bạn là chủ doanh nghiệp nhỏ, nhà sáng tạo nội dung hay chuyên gia marketing, TikMatrix đều cung cấp các công cụ bạn cần để thành công trong môi trường truyền thông xã hội cạnh tranh ngày nay. Đội ngũ của chúng tôi cam kết giúp bạn đạt được mục tiêu marketing và mở rộng ảnh hưởng trực tuyến.</p>

                    <h2>Liên Hệ Với Chúng Tôi</h2>
                    <p>Có câu hỏi hoặc cần trợ giúp? Chúng tôi luôn sẵn sàng phục vụ bạn!</p>
                    <p>Email: support@tikmatrix.com</p>
                    <p>Tham gia cộng đồng của chúng tôi: <a href="https://t.me/tikmatrix_agent_bot">Nhóm Hỗ Trợ Telegram</a></p>
                </div>
            </div>
        </Layout>
    );
} 