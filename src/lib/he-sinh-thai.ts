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
  partner: "HTX Quê Hương Xanh",
  message: "Từ giá trị bản địa đến thị trường hiện đại",
};

export const roles = [
  {
    name: "Diary Media",
    role: "Chủ trì chiến lược & điều hành triển khai",
    body: "Định hướng chiến lược, xây dựng thương hiệu, sản xuất nội dung, vận hành kênh số và điều phối toàn bộ hệ sinh thái.",
  },
  {
    name: "HTX Quê Hương Xanh",
    role: "Đối tác hợp tác · Mạng lưới & nguồn hàng",
    body: "Phát triển mạng lưới nhà sản xuất, hợp tác xã và nguồn hàng; phối hợp vận hành thương mại cùng Diary Media.",
  },
];

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
