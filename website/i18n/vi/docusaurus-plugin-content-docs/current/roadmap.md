---
sidebar_position: 1
title: Định vị Sản phẩm & Lộ trình TikMatrix/IgMatrix
sidebar_label: Lộ trình
description: Lộ trình chính thức mô tả định vị TikMatrix/IgMatrix, ranh giới khả năng và khuyến nghị triển khai.
slug: roadmap
---

## Bản đồ Quy trình Đầy đủ

![TikMatrix/IgMatrix Roadmap](/img/roadmap-en.svg)

---

## Chúng tôi tạo giá trị cho ai

- **SMB / MCN / thương hiệu / nhóm thí nghiệm**: cần thực thi ổn định các hành động vận hành hàng ngày nhưng giống con người ở quy mô 5–100 thiết bị.
- **Hoạt động tăng trưởng & nội dung**: cần điều phối hàng loạt có thể kiểm soát (nhưng không cơ học) để cân bằng an toàn và hiệu quả.

---

## Đề xuất giá trị cốt lõi (tại sao chọn TikMatrix/IgMatrix)

1. **Tự động hóa hàng loạt có thể kết hợp**: xây dựng các pipeline có thể tái sử dụng với mô hình "tác vụ → script → nguồn dữ liệu", bao gồm làm ấm, xuất bản, tương tác và thu thập.
2. **Hành vi giống con người & kiểm soát rủi ro**: engine hỗ trợ thời gian ngẫu nhiên, kiểm soát nhịp độ, mô phỏng cử chỉ con người và phục hồi bất thường để giống hành vi người dùng thực.
3. **Khả năng mở rộng & ổn định**: hỗ trợ thiết bị thực / thiết bị đám mây lai, USB/TCP ADB, cho phép mở rộng tuyến tính từ 5→20→50→100 thiết bị với lập lịch đáng tin cậy.
4. **Khả năng quan sát**: nhật ký tác vụ, chiếu thiết bị, thống kê tài khoản và dữ liệu kết quả có thể xuất.

---

## Bản đồ khả năng (phạm vi bước 4)

### 1) Điều phối & lập lịch tác vụ

- Chiến lược đồng thời đa tài khoản / đa thiết bị, thứ tự thực thi ngẫu nhiên
- Thử lại khi thất bại, tiếp tục từ điểm ngắt, quản lý tài nguyên (tài sản/tài khoản/proxy)

### 2) Trung tâm script

- **Script tiếp thị nâng cao**: bao gồm Tăng cường người dùng/bài đăng, DM hàng loạt, bình luận hàng loạt
- Script làm ấm tài khoản: duyệt hàng ngày, lưu trú, tương tác nhẹ
- Script xuất bản nội dung: quản lý video/phụ đề/thẻ/chủ đề, xuất bản theo lịch
- Script thu thập dữ liệu: thu thập thông tin người dùng và xây dựng danh sách mục tiêu tiếp theo

### 3) Kiểm soát con người & rủi ro

- Ngẫu nhiên hóa thời gian chạm/vuốt/tạm dừng/xem
- Phát hiện bất thường và giới hạn tốc độ để tránh hành vi tần số cao đột ngột

> **Tuyên bố ranh giới**: TikMatrix/IgMatrix KHÔNG cung cấp thiết bị, tài khoản hoặc proxy; chúng tôi tập trung vào tự động hóa các hành động vận hành.

---

## Khuyến nghị triển khai (từ 0 đến quy mô)

1. **Xác thực (1–5 thiết bị)**: kết nối thiết bị → tài khoản → proxy → vòng lặp đóng tối thiểu của script đơn
2. **Thí điểm (10–20 thiết bị)**: giới thiệu script tiếp thị nâng cao + vòng lặp thu thập dữ liệu; giám sát ngưỡng rủi ro
3. **Mở rộng (20–50 thiết bị)**: giới hạn tốc độ nhóm, chiến lược ngẫu nhiên, luân phiên nhiều nguồn dữ liệu
4. **Quy mô (50–100 thiết bị)**: lập lịch hàng loạt, thực thi lệch pha

---

## Rủi ro & ghi chú tuân thủ

- Sử dụng tự động hóa có thể vi phạm điều khoản nền tảng; sử dụng tự chịu rủi ro và kiểm soát tần số/mẫu hành vi
- Phần cứng thiết bị, proxy, chất lượng tài khoản và chiến lược vận hành ảnh hưởng đáng kể đến ổn định và kết quả

---

## Câu hỏi thường gặp

**H: TikMatrix có cung cấp tài khoản/proxy không?**  
Đ: Không. Chúng tôi tập trung vào engine tự động hóa và thực thi script.

**H: Bạn có cung cấp điện thoại đám mây không?**  
Đ: Không. Người dùng nên tự chuẩn bị môi trường thiết bị.

**H: Bạn có hỗ trợ điện thoại đám mây không?**  
Đ: Bất kỳ thiết bị nào có thể kết nối ổn định qua ADB (USB/TCP) đều có thể được lập lịch.

---

## Lời kêu gọi hành động

- Thử gói Starter ngay bây giờ và xây dựng vòng lặp đóng khả thi tối thiểu bước 4 của bạn
- Đọc tài liệu script để bắt đầu các hoạt động hàng loạt
