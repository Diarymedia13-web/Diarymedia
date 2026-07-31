# Hướng dẫn đưa website lên mạng

Ba bước: đẩy code lên GitHub → khai báo thông tin FTP → website tự động cập nhật mỗi lần sửa.

Toàn bộ lệnh chạy trong thư mục `diary-agency`.

---

## Bước 1 — Đẩy code lên GitHub

### 1.1. Tạo kho chứa trên GitHub

Vào https://github.com/new

- **Repository name**: `diary-agency`
- Chọn **Private** (nên chọn, vì trong code có thông tin doanh nghiệp)
- **KHÔNG** tích "Add a README file" — dự án đã có sẵn
- Bấm **Create repository**

### 1.2. Kết nối và đẩy lên

Thay `TEN-GITHUB-CUA-BAN` bằng tên tài khoản GitHub của bạn:

```bash
git remote add origin https://github.com/TEN-GITHUB-CUA-BAN/diary-agency.git
```

```bash
git push -u origin main
```

GitHub sẽ hỏi tài khoản. Lưu ý: **không dùng mật khẩu GitHub thông thường**, phải dùng Personal Access Token:

1. Vào https://github.com/settings/tokens → **Generate new token (classic)**
2. Đặt tên bất kỳ, tích quyền **repo**
3. Bấm **Generate token**, sao chép chuỗi hiện ra
4. Khi terminal hỏi *Password*, dán chuỗi token đó vào

---

## Bước 2 — Lấy thông tin FTP từ Hostinger

Đăng nhập hPanel → chọn tên miền → **Files → FTP Accounts**.

Ghi lại 3 thông tin:

| Cần lấy | Nằm ở đâu trên hPanel |
|---|---|
| FTP hostname | Dòng *FTP hostname*, ví dụ `ftp.tenmien.com` hoặc một dãy IP |
| FTP username | Dòng *FTP username* |
| FTP password | Bấm **Change account password** để đặt mật khẩu mới nếu chưa nhớ |

Còn một thông tin nữa là **thư mục đích**:

- Nếu đây là tên miền chính của gói hosting → `/public_html/`
- Nếu là tên miền phụ thêm vào sau → `/domains/tenmien.com/public_html/`

Kiểm tra bằng **Files → File Manager**: đường dẫn hiện trên thanh địa chỉ chính là thư mục cần dùng.

---

## Bước 3 — Khai báo bí mật trên GitHub

Vào kho chứa vừa tạo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.

Thêm lần lượt 5 mục (tên phải viết đúng chính xác):

| Name | Secret |
|---|---|
| `FTP_SERVER` | FTP hostname ở bước 2 |
| `FTP_USERNAME` | FTP username ở bước 2 |
| `FTP_PASSWORD` | FTP password ở bước 2 |
| `FTP_SERVER_DIR` | `/public_html/` (hoặc đường dẫn tên miền phụ) |
| `WEB3FORMS_KEY` | Access key lấy ở https://web3forms.com |

**Lấy `WEB3FORMS_KEY` như thế nào:** vào https://web3forms.com, nhập email muốn nhận yêu cầu tư vấn (ví dụ `Diarymedia13@gmail.com`), bấm gửi. Access key sẽ được gửi vào chính hộp thư đó. Đây là dịch vụ miễn phí không giới hạn số lượt gửi.

---

## Bước 4 — Chạy deploy

Vào kho chứa trên GitHub → tab **Actions** → chọn **Build & Deploy to Hostinger** → bấm **Run workflow**.

Quá trình mất khoảng 2 – 3 phút. Khi thấy dấu tích xanh là website đã lên.

Mở `https://tenmien.com` để kiểm tra.

---

## Từ giờ về sau: sửa nội dung như thế nào

1. Mở file cần sửa (xem bảng trong `README.md` mục 4).
2. Lưu lại, rồi chạy:

```bash
git add -A && git commit -m "Cập nhật nội dung" && git push
```

3. GitHub tự build và đẩy lên hosting. Khoảng 3 phút sau website đã cập nhật.

---

## Việc cần làm ngay sau lần deploy đầu tiên

### 1. Bật HTTPS (bắt buộc)

hPanel → **Security → SSL** → cài chứng chỉ miễn phí cho tên miền. Chờ khoảng 15 phút.

Sau khi SSL hoạt động, mở **File Manager → public_html → .htaccess**, tìm đoạn:

```apache
  # RewriteCond %{HTTPS} !=on
  # RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

Bỏ hai dấu `#` ở đầu dòng rồi lưu lại. Từ đó mọi truy cập `http://` sẽ tự chuyển sang `https://`.

> Nếu File Manager không hiện file `.htaccess`: bấm biểu tượng **Settings** ở góc trên rồi bật **Show hidden files**.

### 2. Cập nhật tên miền thật

Mở `src/lib/site.ts`, sửa dòng:

```ts
url: "https://diaryagency.vn",
```

thành tên miền thật của bạn, rồi `git push` lại. Nếu bỏ qua bước này, `sitemap.xml` gửi cho Google sẽ trỏ sai địa chỉ.

### 3. Khai báo với Google

1. Vào https://search.google.com/search-console
2. Thêm tên miền, xác minh quyền sở hữu theo hướng dẫn
3. Mục **Sitemaps**, nhập `sitemap.xml` rồi bấm **Submit**

### 4. Kiểm tra form liên hệ

Vào trang `/lien-he`, điền thử một yêu cầu và bấm gửi. Kiểm tra hộp thư đã đăng ký với Web3Forms xem đã nhận được chưa.

---

## Xử lý sự cố thường gặp

| Hiện tượng | Nguyên nhân & cách sửa |
|---|---|
| Trang chủ hiện, nhưng vào `/du-an/` báo 404 | Thiếu file `.htaccess` trong `public_html`. Bật *Show hidden files* trong File Manager để kiểm tra. Nếu thiếu, tải file `public/.htaccess` từ dự án lên. |
| Actions báo lỗi ở bước FTP | Sai `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` hoặc `FTP_SERVER_DIR`. Đối chiếu lại với hPanel, chú ý `FTP_SERVER_DIR` phải có dấu `/` ở đầu và cuối. |
| Vẫn thấy trang mặc định của Hostinger | Trong `public_html` còn file `default.php` hoặc `index.php` cũ. Xoá đi. |
| Form gửi xong báo "chưa được kết nối" | Chưa khai báo secret `WEB3FORMS_KEY`, hoặc khai báo sau khi đã deploy. Thêm secret rồi chạy lại workflow. |
| Sửa nội dung nhưng web chưa đổi | Trình duyệt đang giữ bản cũ. Nhấn `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac). |
| Ảnh không hiện | Kiểm tra thư mục `images` đã được tải lên `public_html` chưa. |

---

## Cách thủ công (nếu không muốn dùng GitHub)

```bash
npm run build
```

Sau đó:

1. Mở thư mục `out/`, chọn **toàn bộ nội dung bên trong** (không nén cả thư mục `out`).
2. Nén thành `site.zip`.
3. hPanel → **File Manager** → vào `public_html` → xoá file cũ.
4. Upload `site.zip` → bấm **Extract**.
5. Kiểm tra `.htaccess` đã có trong `public_html` (bật *Show hidden files*).

Lưu ý: cách này phải lặp lại thủ công mỗi lần sửa nội dung.
