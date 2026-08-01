# Hướng dẫn đưa website lên mạng

Cập nhật: website này dùng **tích hợp GitHub App có sẵn của Hostinger** — đơn giản hơn nhiều so với cách FTP truyền thống. Không cần tạo Personal Access Token, không cần khai FTP secret.

**Website đang chạy tại**: https://diaryagencygiaiphaptruyenthong.com

---

## Cách hoạt động

1. Bạn sửa code trên máy → `git push` lên GitHub (nhánh `main`)
2. Hostinger tự động phát hiện commit mới, build, và thay thế bản cũ
3. Mất khoảng 2 phút, xem tiến trình tại: **hPanel → chọn website → Bảng điều khiển → Tất cả các triển khai**

Không có bước "khai FTP secret" hay "chạy GitHub Actions" nào cần làm nữa.

---

## Từ giờ, muốn sửa nội dung thì làm sao

1. Sửa file cần thiết (xem bảng trong `README.md` mục 4 — hầu hết chỉ cần sửa 3 file trong `src/lib/`)
2. Mở **GitHub Desktop**
3. App tự hiện danh sách file thay đổi → gõ mô tả ngắn ở ô **Summary** → bấm **Commit to main**
4. Bấm **Push origin** ở góc trên bên phải
5. Đợi khoảng 2 phút, Hostinger tự deploy xong — mở lại website để kiểm tra

Nếu chưa cài GitHub Desktop: tải tại https://desktop.github.com, đăng nhập bằng nút bấm qua trình duyệt (không cần token), rồi **File → Add Local Repository** → chọn thư mục dự án.

---

## Việc cần làm để hoàn thiện

### 1. Xác minh email đăng ký tên miền (quan trọng)

hPanel có thể cảnh báo dòng: *"Xác minh email để đăng ký tên miền. Hoàn tất đăng ký để duy trì trang web trực tuyến."* Nếu thấy cảnh báo này:

1. Kiểm tra hộp thư đã dùng để đăng ký tên miền
2. Tìm mail xác minh từ Hostinger hoặc nhà đăng ký tên miền (ICANN)
3. Bấm link xác nhận trong mail

Bỏ qua bước này có nguy cơ tên miền bị tạm khoá theo quy định ICANN.

### 2. Kết nối form liên hệ nhận mail thật

Form báo giá ở trang `/lien-he` hiện chưa gửi được mail vì thiếu access key.

1. Vào https://web3forms.com, nhập email muốn nhận yêu cầu tư vấn (ví dụ email công ty), bấm tạo key
2. Access key sẽ được gửi vào chính email đó
3. Vào **hPanel → chọn website → Bảng điều khiển**, tìm mục **Environment Variables** (biến môi trường)
4. Thêm biến:
   - Tên: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Giá trị: access key vừa nhận
5. Bấm **Tái triển khai (Redeploy)** để áp dụng

### 3. Bật HTTPS / SSL (nếu chưa tự động)

hPanel → **Security → SSL** → kiểm tra chứng chỉ đã cài cho tên miền. Hostinger thường tự cấp SSL miễn phí cho domain mua qua họ, nhưng nên kiểm tra lại.

### 4. Khai báo với Google

1. Vào https://search.google.com/search-console
2. Thêm tên miền `diaryagencygiaiphaptruyenthong.com`, xác minh quyền sở hữu
3. Mục **Sitemaps**, nhập `sitemap.xml` rồi bấm **Submit**

---

## Xử lý sự cố thường gặp

| Hiện tượng | Nguyên nhân & cách sửa |
|---|---|
| Push code xong nhưng web chưa đổi | Chờ thêm — quá trình build mất khoảng 2 phút. Kiểm tra tiến trình ở hPanel → Tất cả các triển khai. |
| hPanel báo triển khai thất bại | Mở chi tiết triển khai đó, xem "Xây dựng nhật ký" (build log) để biết lỗi cụ thể — thường là lỗi cú pháp code. |
| Form gửi xong báo "chưa được kết nối" | Chưa thêm biến `NEXT_PUBLIC_WEB3FORMS_KEY` trong Environment Variables, hoặc thêm xong nhưng chưa bấm Redeploy. |
| Sửa nội dung nhưng web chưa đổi dù đã deploy xong | Trình duyệt đang giữ bản cũ. Nhấn `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac). |
| Cảnh báo "xác minh email tên miền" không biến mất | Kiểm tra đúng hộp thư dùng khi đăng ký domain, không phải hộp thư nhận yêu cầu tư vấn của khách. |
