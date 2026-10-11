/**
 * HỆ SINH THÁI DIARY — chuyển đổi kép SME
 * Hợp tác giữa Diary Media (chủ trì chiến lược & điều hành) và HTX Quê Hương
 * Xanh (mạng lưới nhà sản xuất & nguồn hàng). Trang: /he-sinh-thai/
 *
 * NGUYÊN TẮC DỮ LIỆU: chỉ đưa sản phẩm, nhà sản xuất, đối tác, chứng nhận đã
 * được hai bên xác nhận. Không ghi giá bán chưa duyệt, không ghi số liệu
 * doanh thu/thu nhập, không đưa tỷ lệ chia lợi nhuận hay hợp đồng lên web.
 * Bản ghi "draft" soạn sẵn nhưng không hiện; đổi sang "published" khi đã duyệt.
 */

export type PublishStatus = "published" | "draft";

export interface Media {
  src: string;
  alt: string;
  /** Ảnh lấy từ dự án Diary Media làm cho khách khác — ghi rõ để không bị hiểu là sản phẩm của hệ sinh thái. */
  credit: string;
}

export const ecosystem = {
  name: "Hệ Sinh Thái DIARY",
  positioning: "Chuyển đổi kép SME",
  partner: "HTX Quê Hương Xanh (VINAGC)",
  message: "Từ giá trị bản địa đến thị trường hiện đại",
};

export const roles = [
  {
    name: "Diary Media",
    role: "Chủ trì chiến lược & điều hành triển khai",
    body: "Định hướng chiến lược, xây dựng thương hiệu, sản xuất nội dung, vận hành kênh số và điều phối toàn bộ hệ sinh thái.",
  },
  {
    name: "HTX Quê Hương Xanh (VINAGC)",
    role: "Đối tác hợp tác · Mạng lưới & nguồn hàng",
    body: "Phát triển mạng lưới nhà sản xuất, hợp tác xã và nguồn hàng nông nghiệp bền vững; phối hợp vận hành thương mại cùng Diary Media.",
  },
];

export interface CredentialHighlight {
  id: string;
  badge: string;
  title: string;
  englishTitle?: string;
  issuer: string;
  period: string;
  description: string;
}

export interface TrainingItem {
  name: string;
  desc: string;
  issuer: string;
  date: string;
  location?: string;
  details?: string[];
}

export interface TrainingGroup {
  group: string;
  badge: string;
  items: TrainingItem[];
}

export interface EnterpriseAchievement {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  code?: string;
  desc: string;
  metrics?: { label: string; value: string }[];
}

export interface HtxDirectorProfile {
  name: string;
  fullName: string;
  displayName: string;
  role: string;
  fullRole: string;
  organization: {
    name: string;
    shortName: string;
    field: string;
    founded: string;
    description: string;
  };
  photo: string;
  expertise: string[];
  credentials: CredentialHighlight[];
  training: TrainingGroup[];
  achievements: EnterpriseAchievement[];
}

/**
 * Chủ tịch VINAGC (Hợp tác xã Quê Hương Xanh) — Người giữ gốc.
 * Đầy đủ thông tin đào tạo, danh hiệu chuyên gia và thành tựu doanh nghiệp bao trùm.
 */
export const htxDirector: HtxDirectorProfile = {
  name: "Huỳnh Tiên",
  fullName: "Huỳnh Thị Kim Tiên",
  displayName: "chị Huỳnh Tiên",
  role: "Chủ tịch VINAGC",
  fullRole: "Chủ tịch Hợp tác xã Quê Hương Xanh (VINAGC)",
  organization: {
    name: "Hợp tác xã Quê Hương Xanh (VINAGC)",
    shortName: "VINAGC",
    field: "Nông nghiệp bền vững tại Việt Nam",
    founded: "2024",
    description: "Doanh nghiệp hoạt động trong lĩnh vực nông nghiệp bền vững tại Việt Nam, thành lập năm 2024.",
  },
  photo: "/images/he-sinh-thai/giam-doc-htx.webp",
  expertise: [
    "Nông nghiệp bền vững & Nguồn hàng",
    "Chuyên gia & Cố vấn khởi nghiệp",
    "Quy chuẩn kỹ thuật (GRP) & Hữu cơ",
    "Tín chỉ Carbon & Doanh nghiệp bao trùm",
  ],
  credentials: [
    {
      id: "expert",
      badge: "Chuyên gia Quốc gia",
      title: "Chuyên gia Khởi nghiệp Quốc gia",
      englishTitle: "National Entrepreneurship Expert",
      issuer: "Hội đồng Tư vấn Khởi nghiệp Quốc gia & Viện Nghiên cứu Khởi nghiệp",
      period: "12/08/2025 – 28/11/2025",
      description: "Được công nhận sau khi hoàn thành khóa đào tạo nâng cao năng lực kéo dài 40 buổi, chuẩn hoá chuyên môn cố vấn và thúc đẩy hệ sinh thái khởi nghiệp đổi mới sáng tạo.",
    },
    {
      id: "mentor",
      badge: "Startup Mentor",
      title: "Cố vấn Khởi nghiệp",
      englishTitle: "Startup Mentor",
      issuer: "Trung tâm Thông tin KH&CN (CASTI HUB) — Sở KH&CN TP. Cần Thơ",
      period: "31/05/2024",
      description: "Được cấp chứng nhận hoàn thành chương trình huấn luyện nâng cao năng lực cố vấn khởi nghiệp và đồng hành cùng các mô hình chuyển đổi số.",
    },
  ],
  training: [
    {
      group: "Lãnh đạo & Khởi nghiệp",
      badge: "Lãnh đạo",
      items: [
        {
          name: "Lãnh đạo sáng tạo (INNOLEAD)",
          desc: "Khóa đào tạo INNOLEAD – Lãnh đạo dẫn dắt sáng tạo dành cho nữ doanh nhân Đồng bằng Sông Cửu Long",
          issuer: "Trung tâm Sáng tạo và Ươm tạo FTU (Trường Đại học Ngoại thương) phối hợp cùng GreenCoach",
          date: "10 – 11/05/2024",
          location: "Cần Thơ",
        },
        {
          name: "Phát triển bền vững & Tín chỉ Carbon",
          desc: "Khóa tập huấn Công tác lãnh đạo về phát triển bền vững và tín chỉ Carbon",
          issuer: "Viện Chính sách Công và Phát triển Nông thôn (PRD), The VOS Global Audit & Intertek Vietnam",
          date: "26/04/2024",
        },
      ],
    },
    {
      group: "Nông nghiệp bền vững & Tiêu chuẩn thương mại quốc tế",
      badge: "Tiêu chuẩn quốc tế",
      items: [
        {
          name: "Nông nghiệp hữu cơ (Australia – Vietnam)",
          desc: "Chương trình Sản xuất nông sản hữu cơ, chứng nhận và thương mại giữa Úc và Việt Nam thuộc dự án AVEG Round 02",
          issuer: "Mekong Organics cùng Bộ Ngoại giao và Thương mại Úc (DFAT)",
          date: "08 – 11/01/2024",
          details: [
            "Nguyên tắc và quy trình chứng nhận hữu cơ quốc tế",
            "Kỹ thuật sản xuất phân bón hữu cơ sinh học",
            "Quản lý sâu bệnh hại an toàn sinh thái",
            "Xử lý và đóng gói bảo quản sau thu hoạch",
          ],
        },
        {
          name: "Thực hành quy chuẩn kỹ thuật tốt (GRP)",
          desc: "Khóa đào tạo Áp dụng hiệu quả thực hành quy chuẩn kỹ thuật tốt (GRP) trong xây dựng quy chuẩn kỹ thuật và quy trình đánh giá sự phù hợp",
          issuer: "Quỹ Hỗ trợ Thương mại Khu vực vì Phát triển (RT4D), Jacobs, Cordova & Associates và Tổng cục Tiêu chuẩn Đo lường Chất lượng Việt Nam (STAMEQ)",
          date: "05 – 06/11/2025",
          location: "TP. Hồ Chí Minh",
        },
      ],
    },
  ],
  achievements: [
    {
      id: "inclusive-business",
      badge: "Inclusive Business Certified",
      title: "Chứng nhận Doanh nghiệp Bao trùm",
      issuer: "Viện Nghiên cứu Đổi mới và Phát triển (IID)",
      code: "Mã số: IID/25/IB1-004 · Hiệu lực đến 12/2028",
      desc: "Viện IID cấp chứng nhận cho HTX Quê Hương Xanh nhờ tích hợp bền vững nhóm thu nhập thấp và yếu thế vào chuỗi giá trị và thúc đẩy kinh tế cộng đồng nông thôn.",
    },
    {
      id: "orange-seal",
      badge: "Orange Seal · IIX Impact",
      title: "Chỉ số tác động xã hội & Giới: 8.21/10",
      issuer: "Báo cáo tác động của IIX (Impact Investment Exchange)",
      code: "Cam kết Tác động Giới & Khí hậu quốc tế",
      desc: "Ghi nhận VINAGC đạt điểm tác động 8.21/10, đạt nhãn Orange Seal về cam kết tác động giới và khí hậu, với tỷ lệ khách hàng là phụ nữ chiếm từ 70% – 89%.",
      metrics: [
        { label: "Điểm tác động IIX", value: "8.21 / 10" },
        { label: "Khách hàng nữ", value: "70% – 89%" },
      ],
    },
  ],
};

export interface Pillar {
  id: string;
  name: string;
  summary: string;
  points: string[];
  media: Media;
}

export const pillars: Pillar[] = [
  {
    id: "dac-san",
    name: "Đặc sản Việt",
    summary: "Giới thiệu và thương mại hoá đặc sản, sản phẩm OCOP, nông sản chế biến và sản phẩm truyền thống.",
    points: ["Thẩm định & chuẩn hoá sản phẩm", "Kể câu chuyện người làm ra", "Đưa lên sàn TMĐT và kênh hiện đại"],
    media: { src: "/images/work/coffee-03.webp", alt: "Thợ rang vận hành máy rang cà phê trong xưởng", credit: "Dự án cà phê rang xay" },
  },
  {
    id: "livestream",
    name: "Live Commerce",
    summary: "Tổ chức livestream bán hàng, sản xuất nội dung, quản lý phiên live và kết nối KOC với doanh nghiệp.",
    points: ["Kịch bản & dàn dựng phiên live", "Ekip kỹ thuật, host, báo cáo sau phiên", "Live trực tiếp tại nơi sản xuất"],
    media: { src: "/images/bts/bts-14.webp", alt: "Đạo diễn đeo tai nghe theo dõi màn hình trong buổi ghi hình", credit: "Hậu trường Diary Media" },
  },
  {
    id: "qua-tang",
    name: "Gift Collection",
    summary: "Bộ quà đặc sản theo chủ đề: quà doanh nghiệp, quà đối tác, quà Tết và quà đồng thương hiệu.",
    points: ["Tuyển chọn sản phẩm theo dịp tặng", "Thiết kế hộp & thiệp riêng", "Báo giá theo số lượng và ngân sách"],
    media: { src: "/images/work/bienhaiquan-04.webp", alt: "Hộp quà giấy kraft chứa bốn hũ gia vị", credit: "Bao bì Diary Media thiết kế cho Biên Hải Quán" },
  },
  {
    id: "creator",
    name: "Creator Academy",
    summary: "Đào tạo KOL/KOC: xây kênh cá nhân, video ngắn, livestream, bán hàng qua nội dung và kết nối nhãn hàng.",
    points: ["Xây kênh & định vị cá nhân", "Video ngắn & livestream bán hàng", "Kết nối nhãn hàng trong hệ sinh thái"],
    media: { src: "/images/wall/wall-03.webp", alt: "Người quay phim cầm máy quay gắn tay cầm chống rung", credit: "Hậu trường Diary Media" },
  },
  {
    id: "giai-phap",
    name: "Business Solutions",
    summary: "Chiến lược, thương hiệu, truyền thông, website & TMĐT, CRM, AI và vận hành marketing A–Z cho SME.",
    points: ["Chiến lược & xây dựng thương hiệu", "Website, TMĐT, CRM & tự động hoá", "AI & chuyển đổi số"],
    media: { src: "/images/bts/bts-21.webp", alt: "Ekip trao đổi bên màn hình máy tính trong văn phòng", credit: "Hậu trường Diary Media" },
  },
];

export const processSteps = [
  { title: "Đăng ký", body: "Gửi thông tin qua form bên dưới, khoảng 3 phút." },
  { title: "Đánh giá", body: "Xem xét sản phẩm, năng lực sản xuất hoặc bài toán kinh doanh." },
  { title: "Tư vấn mô hình", body: "Đề xuất hình thức hợp tác phù hợp, minh bạch trước khi triển khai." },
  { title: "Triển khai", body: "Thống nhất kế hoạch, phân công rõ đầu việc và bắt đầu làm." },
  { title: "Đo lường & mở rộng", body: "Theo dõi số liệu thật, tối ưu từng vòng và mở rộng khi đã chạy." },
];

/* Sản phẩm / câu chuyện nhà sản xuất — chưa có bản ghi nào được xác nhận. */
export interface Product {
  slug: string;
  name: string;
  region: string;
  summary: string;
  image: Media;
  status: PublishStatus;
}
export const products: Product[] = [];
export const publishedProducts = () => products.filter((p) => p.status === "published");

/* Dùng trong form */
export const productGroups = [
  "Đặc sản vùng miền",
  "Sản phẩm OCOP",
  "Nông sản chế biến",
  "Gia vị & nước chấm",
  "Trà & cà phê",
  "Thủ công truyền thống",
] as const;

export const giftCategories = ["Quà doanh nghiệp", "Quà đối tác", "Quà lễ Tết", "Quà cá nhân hoá"] as const;

/** Khoảng ngân sách mỗi hộp — chỉ để phân loại yêu cầu, không phải bảng giá. */
export const budgetTiers = [
  { id: "duoi-300", label: "Dưới 300.000đ / hộp" },
  { id: "300-700", label: "300.000 – 700.000đ / hộp" },
  { id: "tren-700", label: "Trên 700.000đ / hộp" },
];

/** Loại nhu cầu (lead_type) — gắn vào mọi lead gửi về. */
export const leadTypes = [
  { id: "nha-san-xuat", label: "Nhà sản xuất / HTX", hint: "Đưa sản phẩm vào hệ sinh thái" },
  { id: "livestream", label: "Cần livestream", hint: "Phiên live bán hàng, ekip, host, KOC" },
  { id: "qua-tang", label: "Cần quà tặng", hint: "Bộ quà đặc sản cho doanh nghiệp" },
  { id: "koc", label: "KOL / KOC", hint: "Creator Academy, kết nối nhãn hàng" },
  { id: "giai-phap", label: "Cần giải pháp A–Z", hint: "Chiến lược, TMĐT, CRM, AI, vận hành" },
] as const;

export type LeadTypeId = (typeof leadTypes)[number]["id"];

export const isLeadType = (v: string | null | undefined): v is LeadTypeId =>
  !!v && leadTypes.some((t) => t.id === v);
