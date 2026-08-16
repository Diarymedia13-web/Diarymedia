/**
 * Hai dòng dịch vụ tách bạch:
 *  - "solution"  → Giải pháp truyền thông cho doanh nghiệp (mảng đang đẩy mạnh)
 *  - "production" → Sản xuất sáng tạo (năng lực lõi đã có sẵn)
 */

export type Track = "solution" | "production";

export interface Service {
  slug: string;
  no: string;
  title: string;
  summary: string;
  deliverables: string[];
  icon: IconKey;
}

export type IconKey =
  | "compass"
  | "trending"
  | "network"
  | "layout"
  | "target"
  | "sparkles"
  | "film"
  | "flame"
  | "smartphone"
  | "camera"
  | "radio"
  | "package"
  | "calendar"
  | "clapperboard";

export const tracks: Record<
  Track,
  { key: Track; label: string; title: string; lead: string; forWho: string }
> = {
  solution: {
    key: "solution",
    label: "Dòng 01",
    title: "Giải pháp doanh nghiệp",
    lead: "Dành cho doanh nghiệp cần một hệ thống truyền thông chạy được — từ chiến lược, hạ tầng số, quảng cáo cho tới ứng dụng AI vào vận hành. Chúng tôi chịu trách nhiệm trên kết quả kinh doanh, không chỉ trên file bàn giao.",
    forWho: "Doanh nghiệp SME, chuỗi, tập đoàn cần đối tác truyền thông dài hạn",
  },
  production: {
    key: "production",
    label: "Dòng 02",
    title: "Sản xuất sáng tạo",
    lead: "Năng lực lõi làm nên tên tuổi Day trong hơn bốn năm: TVC, phim doanh nghiệp, viral video, sự kiện, livestream và nhiếp ảnh thương mại. Đặt riêng theo từng hạng mục, bàn giao trong 12 – 48 giờ.",
    forWho: "Thương hiệu, ban tổ chức sự kiện, agency cần đơn vị sản xuất tin cậy",
  },
};

export const solutionServices: Service[] = [
  {
    slug: "chien-luoc-truyen-thong",
    no: "01",
    title: "Chiến lược truyền thông",
    summary:
      "Định vị thương hiệu, xác định tệp khách hàng mục tiêu và dựng thông điệp lõi trước khi tiêu một đồng ngân sách nào cho sản xuất.",
    deliverables: [
      "Nghiên cứu thị trường & phân tích đối thủ",
      "Định vị và kiến trúc thông điệp thương hiệu",
      "Kế hoạch truyền thông 3 – 12 tháng",
      "Bộ hướng dẫn nội dung & khung KPI đo lường",
    ],
    icon: "compass",
  },
  {
    slug: "chien-luoc-kinh-doanh",
    no: "02",
    title: "Chiến lược kinh doanh",
    summary:
      "Gắn hoạt động truyền thông vào bài toán doanh thu: chân dung khách hàng, phễu bán hàng, chính sách giá và kịch bản chuyển đổi.",
    deliverables: [
      "Chân dung khách hàng & hành trình mua hàng",
      "Thiết kế phễu bán hàng đa kênh",
      "Kịch bản bán hàng và tài liệu hỗ trợ đội sale",
      "Mô hình đo lường doanh thu trên từng kênh",
    ],
    icon: "trending",
  },
  {
    slug: "thuc-day-chuyen-doi-so",
    no: "03",
    title: "Thúc đẩy chuyển đổi số",
    summary:
      "Đưa doanh nghiệp lên nền tảng số một cách có trật tự: dữ liệu khách hàng, tự động hoá quy trình và kênh bán trực tuyến.",
    deliverables: [
      "Rà soát hiện trạng số hoá & lộ trình triển khai",
      "Thiết lập CRM và luồng dữ liệu khách hàng",
      "Tự động hoá chăm sóc khách hàng đa kênh",
      "Đào tạo đội ngũ vận hành nội bộ",
    ],
    icon: "network",
  },
  {
    slug: "thiet-ke-website",
    no: "04",
    title: "Thiết kế website",
    summary:
      "Website là tài sản số quan trọng nhất của thương hiệu. Chúng tôi xây dựng nhanh, chuẩn SEO, tối ưu chuyển đổi và bàn giao trọn quyền sở hữu.",
    deliverables: [
      "Thiết kế giao diện riêng theo nhận diện thương hiệu",
      "Tối ưu tốc độ tải & chuẩn SEO kỹ thuật",
      "Tối ưu tỷ lệ chuyển đổi trên di động",
      "Bàn giao mã nguồn, hướng dẫn quản trị & bảo hành",
    ],
    icon: "layout",
  },
  {
    slug: "quang-cao-da-nen-tang",
    no: "05",
    title: "Chạy quảng cáo đa nền tảng",
    summary:
      "Sản xuất nội dung tốt là chưa đủ. Chúng tôi lên kế hoạch, phân bổ ngân sách và tối ưu quảng cáo để nội dung tới đúng người, đúng thời điểm.",
    deliverables: [
      "Facebook, TikTok, Google & YouTube Ads",
      "Kế hoạch phân bổ ngân sách theo giai đoạn",
      "A/B testing nội dung và tệp khách hàng",
      "Báo cáo hiệu quả theo tuần, tối ưu liên tục",
    ],
    icon: "target",
  },
  {
    slug: "ai-cho-doanh-nghiep",
    no: "06",
    title: "Trí tuệ nhân tạo cho doanh nghiệp",
    summary:
      "Ứng dụng AI vào đúng chỗ tạo ra khác biệt: nhân bản nội dung, chăm sóc khách hàng tự động và rút ngắn thời gian sản xuất.",
    deliverables: [
      "Sản xuất hình ảnh & video ứng dụng AI",
      "Chatbot tư vấn và trực chốt đơn tự động",
      "Trợ lý AI nội bộ trên dữ liệu riêng của doanh nghiệp",
      "Đào tạo đội ngũ sử dụng AI trong công việc hằng ngày",
    ],
    icon: "sparkles",
  },
];

export const productionServices: Service[] = [
  {
    slug: "tvc-phim-doanh-nghiep",
    no: "01",
    title: "TVC & phim doanh nghiệp",
    summary:
      "Từ ý tưởng sáng tạo đến hậu kỳ, đảm bảo từng khung hình đều truyền tải thông điệp mạnh mẽ và chuyên nghiệp.",
    deliverables: ["Kịch bản & storyboard", "Quay phim điện ảnh", "Hậu kỳ, màu, âm thanh", "Phiên bản cắt đa nền tảng"],
    icon: "film",
  },
  {
    slug: "noi-dung-so-viral",
    no: "02",
    title: "Nội dung số & viral video",
    summary:
      "Chúng tôi không chỉ tạo ra nội dung, mà tạo ra xu hướng — giúp thương hiệu lan toả mạnh mẽ trên các nền tảng số.",
    deliverables: ["Nghiên cứu trend & ý tưởng", "Sản xuất theo series", "Tối ưu 3 giây đầu", "Kịch bản phân phối đa kênh"],
    icon: "flame",
  },
  {
    slug: "short-form-reels",
    no: "03",
    title: "Video ngắn, Reels & TikTok",
    summary:
      "Gói sản xuất Reel, TikTok, Shorts tối ưu về nội dung, hình ảnh và âm thanh để giữ chân người xem ngay từ giây đầu tiên.",
    deliverables: ["Gói 10 – 30 video mỗi tháng", "Quay dựng nhanh tại chỗ", "Phụ đề & đồ hoạ động", "Lịch đăng theo tháng"],
    icon: "smartphone",
  },
  {
    slug: "quay-chup-su-kien",
    no: "04",
    title: "Quay phim & chụp ảnh sự kiện",
    summary:
      "Ghi lại trọn vẹn tinh thần và bản sắc của sự kiện, từ hội nghị, gala dinner, teambuilding cho tới lễ hội quy mô lớn.",
    deliverables: ["Ekip đa máy", "Ảnh nhanh trong ngày", "Recap video 12 – 48 giờ", "Kho ảnh gốc đã chọn lọc"],
    icon: "camera",
  },
  {
    slug: "livestream",
    no: "05",
    title: "Livestream chuyên nghiệp",
    summary:
      "Hệ thống livestream đa máy, đa nền tảng cho hội nghị, lễ hội và phiên bán hàng trực tuyến với chất lượng phát sóng ổn định.",
    deliverables: ["Switcher đa camera", "Đồ hoạ hiển thị trực tiếp", "Phát đồng thời nhiều nền tảng", "Dự phòng đường truyền"],
    icon: "radio",
  },
  {
    slug: "chup-anh-san-pham",
    no: "06",
    title: "Chụp ảnh sản phẩm & ẩm thực",
    summary:
      "Ảnh thương mại cho bao bì, sàn thương mại điện tử và quảng cáo — ánh sáng studio, bối cảnh dàn dựng, hậu kỳ tinh chỉnh.",
    deliverables: ["Ảnh nền sạch cho e-commerce", "Ảnh bối cảnh thương hiệu", "Ảnh ẩm thực chuyên đề", "Hậu kỳ retouch chuyên sâu"],
    icon: "package",
  },
  {
    slug: "to-chuc-su-kien",
    no: "07",
    title: "Tổ chức & quản lý sự kiện",
    summary:
      "Trọn gói từ ý tưởng, kịch bản chương trình, sân khấu, nhân sự cho tới điều phối hiện trường ngày diễn ra.",
    deliverables: ["Concept & kịch bản chương trình", "Thiết kế sân khấu, ấn phẩm", "Điều phối nhân sự hiện trường", "Truyền thông trước & sau sự kiện"],
    icon: "calendar",
  },
  {
    slug: "du-an-phim",
    no: "08",
    title: "Dự án phim & fashion film",
    summary:
      "Những dự án đòi hỏi ngôn ngữ hình ảnh riêng: phim thời trang, phim tài liệu thương hiệu, MV và các dự án nghệ thuật.",
    deliverables: ["Phát triển ý tưởng nghệ thuật", "Casting & bối cảnh", "Sản xuất quy mô đoàn phim", "Hậu kỳ điện ảnh"],
    icon: "clapperboard",
  },
];

export const processSteps = [
  {
    no: "01",
    title: "Lắng nghe & chẩn đoán",
    body: "Buổi làm việc đầu tiên tập trung vào bài toán kinh doanh của bạn: sản phẩm, tệp khách hàng, kênh đang chạy và con số đang thiếu.",
    duration: "1 – 3 ngày",
  },
  {
    no: "02",
    title: "Chiến lược & đề xuất",
    body: "Chúng tôi trình bày định hướng thông điệp, kế hoạch kênh, hạng mục sản xuất kèm ngân sách và mốc thời gian rõ ràng.",
    duration: "3 – 7 ngày",
  },
  {
    no: "03",
    title: "Sản xuất & triển khai",
    body: "Ekip vào việc theo kế hoạch đã duyệt. Bạn theo dõi tiến độ theo từng mốc, duyệt bản nháp trước khi hoàn thiện.",
    duration: "Theo hạng mục",
  },
  {
    no: "04",
    title: "Đo lường & tối ưu",
    body: "Báo cáo hiệu quả định kỳ, chỉ ra nội dung nào đang chạy tốt và điều chỉnh phân bổ ngân sách cho giai đoạn kế tiếp.",
    duration: "Hằng tuần",
  },
];

export const faqs = [
  {
    q: "Day Agency khác gì với một đơn vị sản xuất video thông thường?",
    a: "Đơn vị sản xuất nhận brief và giao file. Chúng tôi bắt đầu từ bài toán kinh doanh: định vị, thông điệp, kênh phân phối và cách đo lường. Sản xuất hình ảnh chỉ là một mắt xích trong hệ thống đó — nên nội dung làm ra có đích đến rõ ràng thay vì nằm im trên fanpage.",
  },
  {
    q: "Cam kết bàn giao 12 – 48 giờ áp dụng cho hạng mục nào?",
    a: "Áp dụng cho các hạng mục sản xuất nhanh: ảnh sự kiện đã chọn lọc, recap video, video ngắn dạng Reels/TikTok và các bản cắt phân phối. Những dự án lớn như TVC, phim doanh nghiệp hay fashion film sẽ có lịch riêng được thống nhất ngay từ giai đoạn đề xuất.",
  },
  {
    q: "Doanh nghiệp nhỏ, ngân sách hạn chế thì bắt đầu từ đâu?",
    a: "Bắt đầu từ chiến lược và một hạ tầng số tối thiểu: định vị thông điệp, website chuẩn chuyển đổi và một gói nội dung ngắn chạy đều. Ba thứ đó tốn ít hơn nhiều so với việc sản xuất dàn trải rồi không biết đo hiệu quả ở đâu.",
  },
  {
    q: "Chúng tôi có sở hữu toàn bộ sản phẩm sau khi bàn giao không?",
    a: "Có. Toàn bộ file gốc, mã nguồn website, tài khoản quảng cáo và tài sản thiết kế đều thuộc về doanh nghiệp của bạn. Chúng tôi bàn giao kèm hướng dẫn quản trị để đội ngũ nội bộ tự vận hành được.",
  },
  {
    q: "Trí tuệ nhân tạo được ứng dụng như thế nào trong dự án?",
    a: "AI được dùng ở nơi nó thực sự tạo hiệu quả: nhân bản biến thể nội dung để test quảng cáo, dựng hình ảnh concept, chatbot tư vấn và trợ lý nội bộ trên dữ liệu riêng của doanh nghiệp. Phần cảm xúc và ý tưởng lõi vẫn do con người chịu trách nhiệm.",
  },
  {
    q: "Day Agency nhận dự án ở khu vực nào?",
    a: "Trụ sở đặt tại Đà Nẵng, ekip triển khai trên toàn quốc. Với các hạng mục chiến lược, website, quảng cáo và AI, chúng tôi làm việc từ xa hiệu quả với doanh nghiệp ở bất kỳ tỉnh thành nào.",
  },
];
