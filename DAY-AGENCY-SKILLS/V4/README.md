# V4 — DAY AGENCY AI Operating System

V4 biến bộ skill thành một hệ điều hành tăng trưởng có thể nhận **một yêu cầu bằng ngôn ngữ tự nhiên** và tự điều phối chuỗi công việc từ nghiên cứu thị trường đến pipeline và báo cáo.

## Mục tiêu
Một câu như:

`Anh muốn tháng này tìm 30 doanh nghiệp thực phẩm truyền thống ở miền Trung có tiềm năng chuyển dịch sang digital, ưu tiên deal từ 30 triệu trở lên. Làm từ A-Z.`

có thể kích hoạt chuỗi:

**Market Radar → Account Discovery → Account Intelligence → Offer Personalization → Outreach → Proposal → Pipeline → Executive Report**

## Thành phần V4
- `day-agency-ai-os` — bộ điều phối trung tâm.
- `market-radar` — tìm ngành, phân khúc, tín hiệu nhu cầu và cơ hội.
- `account-intelligence` — phân tích từng doanh nghiệp bằng bằng chứng công khai.
- `offer-personalizer` — ghép pain/opportunity với dịch vụ và gói chào phù hợp.
- `outreach-engine` — viết outreach cá nhân hóa theo bằng chứng.
- `proposal-engine` — dựng proposal theo logic vấn đề → chiến lược → phạm vi → thương mại.
- `pipeline-operator` — quản lý trạng thái, next action và nguồn sự thật của pipeline.
- `executive-reporting` — tóm tắt pipeline, cơ hội, rủi ro và việc cần quyết định.
- `governance` — tiêu chuẩn bằng chứng, quyền phê duyệt và bảo vệ dữ liệu.

## Cách dùng
Không cần nhớ tên skill. `day-director` sẽ tự chuyển những yêu cầu phù hợp sang V4.

## Nguyên tắc
- Không bịa contact, doanh thu, pain point, kết quả hay intent mua.
- Phân biệt Fact / Inference / Hypothesis.
- Fresh data phải được xác minh trước khi dùng.
- Không tự gửi outreach, cam kết ngân sách, báo giá hoặc điều khoản nếu chưa có phê duyệt phù hợp.
- Dữ liệu khách hàng là project-scoped; không tự động biến thành tri thức cốt lõi của DAY.
- Pipeline phải có next action rõ ràng, không chỉ là danh sách lead.

## Nguồn sự thật runtime
`V4/runtime/pipeline.csv` là template source-of-truth mặc định cho pipeline khi chưa có CRM/Sheet khác được chỉ định.