# Diary Agency — Website chính thức

Website giới thiệu và bán hàng cho **Diary Agency** — đối tác giải pháp truyền thông toàn diện cho doanh nghiệp.

Xây bằng **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + GSAP**, xuất ra HTML tĩnh để chạy được trên **Hostinger Shared Hosting** mà không cần Node runtime.

---

## 1. Chạy trên máy

Yêu cầu Node.js 20 trở lên.

```bash
npm install
```

```bash
npm run dev
```

Mở http://localhost:3000

## 2. Build bản chạy thật

```bash
npm run build
```

Toàn bộ website tĩnh nằm trong thư mục `out/`. Xem thử bản đã build:

```bash
npm run serve
```

---

## 3. Cấu trúc dự án

```
src/
├── app/
│   ├── layout.tsx           Khung chung: font, SEO, header, footer, JSON-LD
│   ├── page.tsx             Trang chủ
│   ├── giai-phap/           Giải pháp (2 dòng dịch vụ, gói, quy trình, FAQ)
│   ├── du-an/               Dự án (lưới có lọc + lightbox)
│   ├── ve-chung-toi/        Về chúng tôi + Founder
│   ├── lien-he/             Liên hệ + form báo giá
│   ├── globals.css          Design token (màu, chữ, hiệu ứng, chuyển động)
│   ├── sitemap.ts           Tự sinh sitemap.xml
│   └── robots.ts            Tự sinh robots.txt
├── components/              Header, footer, nút liên hệ nhanh, form, lưới dự án…
└── lib/
    ├── site.ts              ★ Thông tin công ty, liên hệ, số liệu, founder
    ├── services.ts          ★ Hai dòng dịch vụ, gói, quy trình, FAQ
    └── projects.ts          ★ Danh sách dự án
public/
├── images/                  Ảnh đã tối ưu sang WebP
└── .htaccess                Cấu hình Apache cho Hostinger
```

★ = ba file bạn sẽ sửa nhiều nhất. **Không cần đụng vào code giao diện** để đổi nội dung.

---

## 4. Sửa nội dung thường gặp

| Muốn đổi gì | Sửa ở đâu |
|---|---|
| Hotline, email, fanpage, địa chỉ, giờ làm việc | `src/lib/site.ts` → `contact` |
| Số liệu năng lực (4+ năm, 2.000+ khách hàng…) | `src/lib/site.ts` → `stats` |
| Tiểu sử / câu nói của founder | `src/lib/site.ts` → `founder` |
| Danh sách thương hiệu chạy ngang trang chủ | `src/lib/site.ts` → `clients` |
| Thêm / sửa dịch vụ | `src/lib/services.ts` |
| Thêm dự án mới | `src/lib/projects.ts` + thêm ảnh vào `public/images/work/` |
| Câu hỏi thường gặp | `src/lib/services.ts` → `faqs` |
| Tên miền thật (cho SEO, sitemap) | `src/lib/site.ts` → `url` |

Sau khi sửa, chạy lại `npm run build` rồi deploy.

---

## 5. Kết nối form liên hệ

Hosting tĩnh không chạy được backend, nên form dùng **Web3Forms** (miễn phí, không giới hạn).

1. Vào https://web3forms.com, nhập email muốn nhận yêu cầu → nhận **Access Key** qua thư.
2. Tạo file `.env.local` ở thư mục gốc dự án:

```bash
echo "NEXT_PUBLIC_WEB3FORMS_KEY=dan-access-key-vao-day" > .env.local
```

3. Khi deploy tự động: thêm key đó vào **GitHub → Settings → Secrets and variables → Actions** với tên `WEB3FORMS_KEY`.

Chưa cấu hình key thì form vẫn hiển thị bình thường, nhưng khi bấm gửi sẽ hướng khách gọi hotline hoặc gửi email — không báo lỗi kỹ thuật.

---

## 6. Deploy lên Hostinger

### Cách A — Tự động qua GitHub Actions (khuyến nghị)

Đã có sẵn workflow tại `.github/workflows/deploy-hostinger.yml`. Mỗi lần `git push` lên nhánh `main`, GitHub sẽ tự build và đẩy lên hosting.

Cần khai báo 5 secret trong **GitHub → Settings → Secrets and variables → Actions → New repository secret**:

| Tên secret | Lấy ở đâu / giá trị |
|---|---|
| `FTP_SERVER` | hPanel → Files → FTP Accounts → mục **FTP hostname** (ví dụ `ftp.tenmien.com`) |
| `FTP_USERNAME` | Tên tài khoản FTP trong cùng trang đó |
| `FTP_PASSWORD` | Mật khẩu FTP (bấm *Change account password* nếu chưa nhớ) |
| `FTP_SERVER_DIR` | `/public_html/` — hoặc `/domains/tenmien.com/public_html/` nếu là addon domain |
| `WEB3FORMS_KEY` | Access key ở bước 5 |

Sau khi thêm đủ, push code lên là xong. Theo dõi tiến trình ở tab **Actions** trên GitHub.

### Cách B — Upload thủ công

1. Chạy `npm run build` trên máy.
2. Mở thư mục `out/`, chọn **toàn bộ nội dung bên trong** (không nén cả thư mục `out`).
3. Nén thành `site.zip`.
4. hPanel → **Files → File Manager** → vào `public_html`.
5. Xoá file mặc định của Hostinger (`default.php`, `index.php`) nếu có.
6. Upload `site.zip` rồi bấm **Extract**.
7. Kiểm tra `public_html/.htaccess` đã tồn tại. Nếu File Manager ẩn file bắt đầu bằng dấu chấm, bật **Settings → Show hidden files**. Thiếu file này thì các đường dẫn con sẽ báo 404.

### Sau khi deploy lần đầu

- **Bật SSL**: hPanel → Security → SSL → cài chứng chỉ miễn phí cho tên miền.
- **Ép HTTPS**: mở `public_html/.htaccess`, bỏ dấu `#` ở khối *Ép HTTPS*.
- **Cập nhật tên miền thật**: sửa `url` trong `src/lib/site.ts` rồi build lại — nếu không, `sitemap.xml` sẽ trỏ sai địa chỉ.
- **Khai báo Google**: đưa `https://tenmien.com/sitemap.xml` vào Google Search Console.

---

## 7. Ghi chú kỹ thuật

- `output: "export"` + `trailingSlash: true` → mỗi trang thành `<đường-dẫn>/index.html`, khớp với cách Apache phục vụ file.
- `images.unoptimized: true` vì shared hosting không chạy được Image Optimization của Next. Ảnh đã được nén sẵn sang WebP nên dung lượng vẫn nhẹ.
- Chuyển động dùng GSAP + ScrollTrigger, khai báo tập trung tại `src/components/motion-provider.tsx`. Toàn bộ đều tôn trọng `prefers-reduced-motion`.
- Không dùng emoji làm biểu tượng — toàn bộ icon là SVG từ `lucide-react`.
- Nếu tắt JavaScript, nội dung vẫn hiển thị đầy đủ (class ẩn chỉ được gắn sau khi JS chạy).
