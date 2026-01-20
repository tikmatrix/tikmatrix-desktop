import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout
            title="Chính Sách Bảo Mật"
            description="Chính Sách Bảo Mật TikMatrix - Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn">
            <div className="container">
                <div className={styles.privacyContent}>
                    <h1>Chính Sách Bảo Mật</h1>
                    <p>Cập nhật lần cuối: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Giới Thiệu</h2>
                    <p>Chào mừng bạn đến với TikMatrix (sau đây gọi là "chúng tôi", "của chúng tôi" hoặc "công ty"). Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập trang web hoặc sử dụng dịch vụ của chúng tôi.</p>

                    <h2>2. Thông Tin Chúng Tôi Thu Thập</h2>
                    <p>Chúng tôi có thể thu thập một số loại thông tin từ người dùng trang web và dịch vụ của chúng tôi, bao gồm:</p>
                    <ul>
                        <li><strong>Thông Tin Cá Nhân:</strong> Họ tên, địa chỉ email, số điện thoại và các định danh khác được cung cấp khi bạn đăng ký dịch vụ của chúng tôi hoặc liên hệ với chúng tôi.</li>
                        <li><strong>Thông Tin Kỹ Thuật:</strong> Địa chỉ IP, loại trình duyệt, hệ điều hành và các chi tiết kỹ thuật khác khi bạn truy cập trang web của chúng tôi.</li>
                        <li><strong>Thông Tin Sử Dụng:</strong> Cách bạn tương tác với trang web và dịch vụ của chúng tôi, bao gồm các tính năng được sử dụng và thời gian dành ra.</li>
                    </ul>

                    <h2>3. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn</h2>
                    <p>Chúng tôi có thể sử dụng thông tin đã thu thập cho nhiều mục đích khác nhau, bao gồm:</p>
                    <ul>
                        <li>Cung cấp, vận hành và duy trì dịch vụ của chúng tôi</li>
                        <li>Cải thiện và cá nhân hóa trải nghiệm của bạn</li>
                        <li>Giao tiếp với bạn về các cập nhật, hỗ trợ và khuyến mãi</li>
                        <li>Phân tích các mô hình sử dụng để nâng cao dịch vụ của chúng tôi</li>
                        <li>Ngăn chặn gian lận và đảm bảo an toàn</li>
                    </ul>

                    <h2>4. Chia Sẻ và Tiết Lộ Thông Tin</h2>
                    <p>Chúng tôi có thể chia sẻ thông tin của bạn trong các trường hợp sau:</p>
                    <ul>
                        <li><strong>Nhà Cung Cấp Dịch Vụ:</strong> Với các bên thứ ba giúp chúng tôi vận hành kinh doanh và cung cấp dịch vụ.</li>
                        <li><strong>Yêu Cầu Pháp Lý:</strong> Khi được yêu cầu bởi pháp luật hoặc để bảo vệ quyền lợi của chúng tôi hoặc sự an toàn của người dùng.</li>
                        <li><strong>Chuyển Giao Kinh Doanh:</strong> Liên quan đến việc sáp nhập, mua lại hoặc bán tài sản.</li>
                    </ul>

                    <h2>5. Bảo Mật Dữ Liệu</h2>
                    <p>Chúng tôi thực hiện các biện pháp bảo mật thích hợp để bảo vệ thông tin cá nhân của bạn. Tuy nhiên, không có phương pháp truyền tải qua internet hoặc lưu trữ điện tử nào là 100% an toàn, và chúng tôi không thể đảm bảo tính bảo mật tuyệt đối.</p>

                    <h2>6. Quyền Của Bạn</h2>
                    <p>Tùy thuộc vào vị trí của bạn, bạn có thể có một số quyền nhất định đối với thông tin cá nhân của mình, bao gồm:</p>
                    <ul>
                        <li>Truy cập thông tin cá nhân của bạn</li>
                        <li>Chỉnh sửa thông tin cá nhân không chính xác</li>
                        <li>Xóa thông tin cá nhân của bạn</li>
                        <li>Phản đối một số hoạt động xử lý</li>
                        <li>Khả năng chuyển dữ liệu</li>
                    </ul>

                    <h2>7. Quyền Riêng Tư Trẻ Em</h2>
                    <p>Dịch vụ của chúng tôi không hướng đến các cá nhân dưới 16 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em.</p>

                    <h2>8. Thay Đổi Chính Sách Bảo Mật</h2>
                    <p>Chúng tôi có thể cập nhật chính sách bảo mật của mình theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách bảo mật mới trên trang này và cập nhật ngày "Cập nhật lần cuối".</p>

                    <h2>9. Liên Hệ Với Chúng Tôi</h2>
                    <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 