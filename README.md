# Diary Agency — Website chính thức

Website giới thiệu và bán hàng cho **Diary Agency** — đối tác giải pháp truyền thông toàn diện cho doanh nghiệp.

Xây bằng **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + GSAP**, xuất ra HTML tĩnh. Deploy tự động qua tích hợp GitHub App có sẵn của Hostinger — mỗi lần push lên nhánh `main`, Hostinger tự kéo mã nguồn, build và cập nhật website, không cần FTP hay GitHub Actions.

**Website đang chạy tại**: https://diaryagencygiaiphaptruyenthong.com

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

Site chạy dưới dạng xuất tĩnh nên form dùng **Web3Forms** (miễn phí, không giới hạn) thay vì backend riêng.

1. Vào https://web3forms.com, nhập email muốn nhận yêu cầu → nhận **Access Key** qua thư.
2. Chạy thử trên máy: tạo file `.env.local` ở thư mục gốc dự án:

```bash
echo "NEXT_PUBLIC_WEB3FORMS_KEY=dan-access-key-vao-day" > .env.local
```

3. Trên bản chạy thật: vào **hPanel → website → Bảng điều khiển → Environment Variables** (hoặc mục tương đương trong phần cấu hình app Node.js), thêm biến `NEXT_PUBLIC_WEB3FORMS_KEY` với giá trị là key vừa lấy, rồi bấm **Tái triển khai (Redeploy)**.

Chưa cấu hình key thì form vẫn hiển thị bình thường, nhưng khi bấm gửi sẽ hướng khách gọi hotline hoặc gửi email — không báo lỗi kỹ thuật.

---

## 6. Deploy — đã tự động, không cần thao tác thêm

Website này được deploy qua **tích hợp GitHub App có sẵn của Hostinger** (thấy ở hPanel → website → Bảng điều khiển → mục "Đã kết nối với GitHub"). Cơ chế:

1. Bạn sửa code, `git push` lên nhánh `main` (qua GitHub Desktop hoặc dòng lệnh).
2. Hostinger tự phát hiện commit mới, chạy `npm install` + `npm run build`, rồi thay thế bản cũ bằng bản mới.
3. Toàn bộ quá trình mất khoảng 2 phút, theo dõi tiến trình ở hPanel → Bảng điều khiển → **Tất cả các triển khai**.

Không cần FTP, không cần secret, không cần GitHub Actions. Muốn build/deploy lại thủ công (không đổi code): vào hPanel, bấm nút **Tái triển khai**.

### Việc cần làm ngay sau khi có tên miền

- **Xác minh email đăng ký tên miền**: hPanel thường cảnh báo ngay trên trang website nếu domain chưa xác minh xong — bỏ qua có thể khiến tên miền bị thu hồi.
- **Bật SSL**: hPanel → Security → SSL (thường tự động với domain qua Hostinger).
- **Cập nhật tên miền thật vào code**: sửa `url` trong `src/lib/site.ts` thành đúng tên miền đang chạy, build lại — nếu không, `sitemap.xml`, canonical URL và Open Graph sẽ trỏ sai địa chỉ.
- **Khai báo Google**: đưa `https://tenmien-that/sitemap.xml` vào Google Search Console.

### Nếu muốn chuyển sang hosting khác không hỗ trợ Git

File `public/.htaccess` và cấu hình `output: "export"` vẫn cho phép upload thủ công lên bất kỳ Apache shared hosting nào:

1. Chạy `npm run build` trên máy.
2. Mở thư mục `out/`, chọn **toàn bộ nội dung bên trong** (không nén cả thư mục `out`), nén thành zip.
3. Upload lên `public_html` qua File Manager, giải nén.
4. Kiểm tra `.htaccess` đã có trong `public_html` (bật *Show hidden files* nếu File Manager ẩn nó) — thiếu file này thì các đường dẫn con sẽ báo 404.

---

## 7. Ghi chú kỹ thuật

- `output: "export"` + `trailingSlash: true` → mỗi trang thành `<đường-dẫn>/index.html`, khớp với cách Apache phục vụ file.
- `images.unoptimized: true` vì shared hosting không chạy được Image Optimization của Next. Ảnh đã được nén sẵn sang WebP nên dung lượng vẫn nhẹ.
- Chuyển động dùng GSAP + ScrollTrigger, khai báo tập trung tại `src/components/motion-provider.tsx`. Toàn bộ đều tôn trọng `prefers-reduced-motion`.
- Không dùng emoji làm biểu tượng — toàn bộ icon là SVG từ `lucide-react`.
- Nếu tắt JavaScript, nội dung vẫn hiển thị đầy đủ (class ẩn chỉ được gắn sau khi JS chạy).
