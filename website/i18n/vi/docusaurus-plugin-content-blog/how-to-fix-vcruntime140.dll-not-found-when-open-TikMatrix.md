---
slug: How-to-fix-vcruntime140.dll-not-found-when-open-TikMatrix
title: Cách khắc phục lỗi "Không tìm thấy vcruntime140.dll"
authors: tikMatrix
tags: [vcruntime140.ddl not found,fixed,tikmatrix]
---
Lỗi "Không tìm thấy vcruntime140.dll" thường xảy ra do gói Microsoft Visual C++ Redistributable chưa được cài đặt hoặc đã bị hỏng. Dưới đây là các bước để khắc phục sự cố này:
<!--truncate-->
---

1. **Tải xuống gói Microsoft Visual C++ Redistributable**:
   - Truy cập [trang tải xuống Microsoft Visual C++ Redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
   - Tải xuống phiên bản phù hợp với hệ thống của bạn (thường là phiên bản 64-bit, nhưng nếu ứng dụng của bạn yêu cầu phiên bản 32-bit, hãy tải xuống phiên bản tương ứng).

2. **Cài đặt gói Redistributable**:
   - Chạy trình cài đặt đã tải xuống và làm theo hướng dẫn trên màn hình để cài đặt.
   - Nếu bạn đã cài đặt gói này, bạn có thể chọn tùy chọn "Sửa chữa" trong quá trình cài đặt để sửa chữa cài đặt.

3. **Khởi động lại máy tính**:
   - Sau khi cài đặt hoặc sửa chữa gói, hãy khởi động lại máy tính để đảm bảo tất cả các thay đổi có hiệu lực.

4. **Kiểm tra cập nhật**:
   - Đảm bảo Windows của bạn đã được cập nhật. Truy cập `Cài đặt > Cập nhật và Bảo mật > Windows Update` và kiểm tra cập nhật.

5. **Cài đặt lại TikMatrix**:
   - Nếu các bước trên không hiệu quả, hãy thử gỡ cài đặt và cài đặt lại TikMatrix. Đảm bảo tải xuống phiên bản mới nhất từ nguồn chính thức.

Nếu lỗi vẫn tồn tại sau khi thử các bước này, bạn có thể cần kiểm tra các vấn đề sâu hơn, chẳng hạn như tệp hệ thống bị hỏng, bằng cách chạy công cụ kiểm tra tệp hệ thống:

1. **Chạy công cụ kiểm tra tệp hệ thống (SFC)**:
   - Mở Command Prompt với quyền quản trị viên (nhấp chuột phải vào nút "Start" và chọn "Command Prompt (Admin)" hoặc "Windows PowerShell (Admin)").
   - Nhập `sfc /scannow` và nhấn Enter.
   - Đợi quá trình hoàn tất. Nếu SFC phát hiện bất kỳ vấn đề nào, nó sẽ cố gắng sửa chữa chúng.

Các bước này sẽ giúp khắc phục lỗi "Không tìm thấy vcruntime140.dll" và làm cho TikMatrix hoạt động bình thường.