import React from 'react';
import Layout from '@theme/Layout';
import styles from './terms-of-service.module.css';

export default function TermsOfService() {
    return (
        <Layout
            title="Điều Khoản Dịch Vụ"
            description="Điều Khoản Dịch Vụ TikMatrix - Quy tắc và hướng dẫn sử dụng nền tảng của chúng tôi">
            <div className="container">
                <div className={styles.termsContent}>
                    <h1>Điều Khoản Dịch Vụ</h1>
                    <p>Cập nhật lần cuối: {new Date().toISOString().split('T')[0]}</p>

                    <h2>1. Chấp Nhận Điều Khoản</h2>
                    <p>Bằng cách truy cập hoặc sử dụng trang web và dịch vụ của TikMatrix, bạn đồng ý bị ràng buộc bởi các điều khoản dịch vụ này cũng như tất cả các luật và quy định hiện hành. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong số này, bạn bị cấm sử dụng hoặc truy cập trang web này.</p>

                    <h2>2. Giấy Phép Sử Dụng</h2>
                    <p>Được phép tải xuống tạm thời các tài liệu (thông tin hoặc phần mềm) trên trang web TikMatrix chỉ để xem tạm thời cá nhân, phi thương mại. Đây là việc cấp giấy phép, không phải chuyển giao quyền sở hữu, và theo giấy phép này, bạn không được:</p>
                    <ul>
                        <li>Sửa đổi hoặc sao chép tài liệu</li>
                        <li>Sử dụng tài liệu cho bất kỳ mục đích thương mại nào hoặc hiển thị công khai</li>
                        <li>Cố gắng dịch ngược bất kỳ phần mềm nào có trong trang web TikMatrix</li>
                        <li>Xóa bất kỳ bản quyền hoặc các dấu hiệu độc quyền khác khỏi tài liệu</li>
                        <li>Chuyển giao tài liệu cho người khác hoặc "sao chép" tài liệu trên bất kỳ máy chủ nào khác</li>
                    </ul>
                    <p>Nếu bạn vi phạm bất kỳ hạn chế nào trong số này, giấy phép này sẽ tự động chấm dứt và có thể bị TikMatrix chấm dứt bất cứ lúc nào.</p>

                    <h2>3. Dịch Vụ và Đăng Ký</h2>
                    <p>TikMatrix cung cấp các công cụ phần mềm cho quản lý tài khoản TikTok và tự động hóa marketing. Truy cập các dịch vụ này có thể yêu cầu đăng ký hoặc thanh toán một lần. Bằng cách đăng ký dịch vụ của chúng tôi, bạn đồng ý:</p>
                    <ul>
                        <li>Có thể hủy đăng ký bất cứ lúc nào trong thời gian dùng thử, nếu không hủy đăng ký sẽ tự động chuyển sang đăng ký trả phí</li>
                        <li>Cung cấp thông tin thanh toán chính xác và đầy đủ</li>
                        <li>Thanh toán tất cả các khoản phí có hiệu lực tại thời điểm phát sinh chi phí</li>
                        <li>Không sử dụng dịch vụ cho bất kỳ mục đích bất hợp pháp nào hoặc vi phạm bất kỳ luật hoặc quy định hiện hành nào</li>
                    </ul>

                    <h2>4. Hành Vi Người Dùng</h2>
                    <p>Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý sẽ không:</p>
                    <ul>
                        <li>Vi phạm bất kỳ luật hoặc quy định hiện hành nào</li>
                        <li>Xâm phạm quyền của người khác</li>
                        <li>Phân phối phần mềm độc hại hoặc tham gia vào các hoạt động có hại khác</li>
                        <li>Cố gắng truy cập trái phép vào hệ thống của chúng tôi hoặc tài khoản của người dùng khác</li>
                        <li>Sử dụng dịch vụ của chúng tôi theo bất kỳ cách nào có thể gây thiệt hại, vô hiệu hóa, quá tải hoặc làm hỏng dịch vụ của chúng tôi</li>
                    </ul>

                    <h2>5. Quyền Sở Hữu Trí Tuệ</h2>
                    <p>Tên TikMatrix, logo, phần mềm và nội dung là tài sản độc quyền của TikMatrix và các bên cấp phép của công ty. Dịch vụ của chúng tôi và tất cả nội dung được chứa hoặc cung cấp thông qua dịch vụ của chúng tôi đều được bảo vệ bởi luật sở hữu trí tuệ.</p>

                    <h2>6. Tuyên Bố Từ Chối Trách Nhiệm</h2>
                    <p>Các tài liệu trên trang web TikMatrix và các dịch vụ được cung cấp đều được cung cấp "nguyên trạng". TikMatrix không đưa ra bất kỳ bảo đảm nào, dù rõ ràng hay ngụ ý, và đặc biệt từ chối tất cả các bảo đảm khác, bao gồm nhưng không giới hạn ở các bảo đảm ngụ ý về khả năng bán được hoặc phù hợp cho một mục đích cụ thể.</p>

                    <h2>7. Giới Hạn Trách Nhiệm</h2>
                    <p>Trong mọi trường hợp, TikMatrix hoặc các nhà cung cấp của công ty sẽ không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng các tài liệu hoặc dịch vụ, ngay cả khi TikMatrix đã được thông báo về khả năng xảy ra thiệt hại như vậy.</p>

                    <h2>8. Luật Áp Dụng</h2>
                    <p>Các điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp của nơi TikMatrix được thành lập, không xem xét các quy định xung đột pháp luật của nơi đó.</p>

                    <h2>9. Thay Đổi Điều Khoản</h2>
                    <p>TikMatrix bảo lưu quyền sửa đổi các điều khoản này bất cứ lúc nào. Chúng tôi sẽ thông báo cho người dùng về bất kỳ thay đổi nào bằng cách cập nhật "Cập nhật lần cuối" của các điều khoản này. Việc bạn tiếp tục sử dụng trang web và dịch vụ của chúng tôi sau bất kỳ thay đổi nào cho thấy bạn chấp nhận các điều khoản đã sửa đổi.</p>

                    <h2>10. Liên Hệ Với Chúng Tôi</h2>
                    <p>Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ với chúng tôi:</p>
                    <p>Email: support@tikmatrix.com</p>
                </div>
            </div>
        </Layout>
    );
} 