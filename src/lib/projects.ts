export type ProjectCategory =
  | "TVC & Phim quảng cáo"
  | "Sự kiện & Livestream"
  | "Fashion Film"
  | "Nhiếp ảnh thương mại"
  | "Brand Film"
  | "Giải pháp truyền thông"
  | "Thiết kế ấn phẩm";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  location?: string;
  summary: string;
  scope: string[];
  cover: string;
  gallery: string[];
  /** Tỉ lệ khung ảnh dùng cho ô lưới ở trang Dự án. */
  span: "tall" | "wide" | "square";
}

export const projects: Project[] = [
  {
    slug: "panasonic-giai-phap-khong-khi",
    title: "Giải pháp không khí toàn diện cho không gian làm việc",
    client: "Panasonic",
    category: "TVC & Phim quảng cáo",
    year: "2025",
    summary:
      "TVC giải pháp doanh nghiệp cho Panasonic: chuyển một sản phẩm kỹ thuật khô khan thành câu chuyện về chất lượng không gian làm việc, kể qua góc nhìn người trực tiếp sử dụng.",
    scope: ["Kịch bản & storyboard", "Sản xuất TVC", "Phỏng vấn nhân vật", "Quay flycam", "Hậu kỳ & phụ đề song ngữ"],
    cover: "/images/work/panasonic-01.webp",
    gallery: [
      "/images/work/panasonic-01.webp",
      "/images/work/panasonic-04.webp",
      "/images/work/panasonic-02.webp",
      "/images/work/panasonic-03.webp",
    ],
    span: "wide",
  },
  {
    slug: "ao-dai-yen-fashion-film",
    title: "Áo Dài “Yên” — Production Diary",
    client: "NTK Lê Đoàn Hùng & NTK Trần Thiện Khánh",
    category: "Fashion Film",
    year: "2024",
    location: "Hội An",
    summary:
      "Dự án fashion film và ghi hình bộ sưu tập áo dài “Yên” tại Hội An. Ngôn ngữ hình ảnh tiết chế, ánh sáng tự nhiên, tôn trọng chất liệu và nhịp chậm của tà áo dài Việt.",
    scope: ["Chỉ đạo hình ảnh", "Fashion film", "Ghi hình runway", "Ảnh look book", "Hậu kỳ điện ảnh"],
    cover: "/images/work/aodai-01.webp",
    gallery: [
      "/images/work/aodai-01.webp",
      "/images/work/aodai-02.webp",
      "/images/work/aodai-04.webp",
      "/images/work/aodai-03.webp",
    ],
    span: "tall",
  },
  {
    slug: "aia-duong-dua-bung-thinh-vuong",
    title: "Đường Đua Bừng Thịnh Vượng",
    client: "AIA Việt Nam",
    category: "Sự kiện & Livestream",
    year: "2024",
    summary:
      "Ghi hình toàn tuyến giải chạy quy mô lớn của AIA: từ khoảnh khắc xuất phát, đường đua ven biển cho tới lễ trao giải — bàn giao ảnh và recap ngay trong ngày.",
    scope: ["Ekip đa máy", "Ảnh phóng sự sự kiện", "Recap video trong ngày", "Flycam đường đua"],
    cover: "/images/work/aia-03.webp",
    gallery: [
      "/images/work/aia-03.webp",
      "/images/work/aia-02.webp",
      "/images/work/aia-01.webp",
      "/images/work/aia-04.webp",
    ],
    span: "wide",
  },
  {
    slug: "danang-guitar-festival",
    title: "Danang International Guitar Festival",
    client: "Ban tổ chức Guitar Festival Đà Nẵng",
    category: "Sự kiện & Livestream",
    year: "2024",
    location: "Đà Nẵng",
    summary:
      "Livestream đa máy và ghi hình toàn bộ liên hoan guitar quốc tế — xử lý điều kiện ánh sáng sân khấu phức tạp và yêu cầu chất lượng âm thanh trực tiếp.",
    scope: ["Livestream đa nền tảng", "Ghi hình sân khấu", "Trộn âm thanh trực tiếp", "Cắt highlight sau chương trình"],
    cover: "/images/work/guitar-02.webp",
    gallery: ["/images/work/guitar-02.webp", "/images/work/guitar-01.webp", "/images/work/guitar-03.webp"],
    span: "square",
  },
  {
    slug: "toa-sang-thien-than-nhi",
    title: "Toả Sáng Thiên Thần Nhí",
    client: "Ban tổ chức Toả Sáng Thiên Thần Nhí",
    category: "Sự kiện & Livestream",
    year: "2024",
    summary:
      "Đồng hành trọn mùa giải: vòng casting, tập luyện và đêm chung kết. Khối lượng ảnh lớn, yêu cầu trả nhanh cho truyền thông từng vòng thi.",
    scope: ["Ảnh & video vòng casting", "Ghi hình chung kết", "Trả ảnh nhanh theo vòng", "Nội dung truyền thông mạng xã hội"],
    cover: "/images/work/kids-04.webp",
    gallery: [
      "/images/work/kids-04.webp",
      "/images/work/kids-01.webp",
      "/images/work/kids-02.webp",
      "/images/work/kids-03.webp",
    ],
    span: "square",
  },
  {
    slug: "le-gia-brand-food",
    title: "Bộ ảnh ẩm thực thương hiệu",
    client: "Lê Gia Brand",
    category: "Nhiếp ảnh thương mại",
    year: "2025",
    summary:
      "Bộ ảnh ẩm thực và hải sản dựng bối cảnh studio: kiểm soát khói, hơi nước và độ tươi nguyên liệu để phục vụ menu, biển hiệu và quảng cáo mạng xã hội.",
    scope: ["Styling món ăn", "Ánh sáng studio", "Ảnh menu & biển hiệu", "Hậu kỳ retouch"],
    cover: "/images/work/food-05.webp",
    gallery: [
      "/images/work/food-05.webp",
      "/images/work/food-04.webp",
      "/images/work/food-01.webp",
      "/images/work/food-06.webp",
      "/images/work/food-02.webp",
      "/images/work/food-03.webp",
    ],
    span: "wide",
  },
  {
    slug: "agreco-coffee",
    title: "Từ nhà máy tới tách cà phê",
    client: "Agreco Coffee",
    category: "Nhiếp ảnh thương mại",
    year: "2025",
    summary:
      "Trọn bộ hình ảnh thương hiệu cà phê: quy trình rang xay tại nhà máy, ảnh bao bì nền sạch cho sàn thương mại điện tử và ảnh bối cảnh phục vụ quảng cáo.",
    scope: ["Ảnh quy trình sản xuất", "Ảnh bao bì e-commerce", "Ảnh bối cảnh thương hiệu", "Video ngắn giới thiệu"],
    cover: "/images/work/coffee-04.webp",
    gallery: [
      "/images/work/coffee-04.webp",
      "/images/work/coffee-06.webp",
      "/images/work/coffee-05.webp",
      "/images/work/coffee-01.webp",
      "/images/work/coffee-03.webp",
      "/images/work/coffee-02.webp",
    ],
    span: "square",
  },
  {
    slug: "wellness-du-lich-brand-film",
    title: "Chuỗi phim thương hiệu nghỉ dưỡng",
    client: "Nhóm khách hàng wellness & du lịch",
    category: "Brand Film",
    year: "2025",
    summary:
      "Chuỗi phim thương hiệu cho các điểm đến nghỉ dưỡng và dịch vụ chăm sóc sức khoẻ: kết hợp flycam vùng đất, chân dung con người và trải nghiệm dịch vụ.",
    scope: ["Brand film", "Quay flycam", "Chân dung nhân vật", "Ảnh dịch vụ", "Hậu kỳ màu"],
    cover: "/images/work/wellness-05.webp",
    gallery: [
      "/images/work/wellness-05.webp",
      "/images/work/wellness-02.webp",
      "/images/work/wellness-06.webp",
      "/images/work/wellness-04.webp",
      "/images/work/wellness-01.webp",
      "/images/work/wellness-03.webp",
    ],
    span: "tall",
  },
  {
    slug: "gala-dinner-a-chau",
    title: "Gala Dinner & đêm sự kiện thương hiệu",
    client: "Tập đoàn Á Châu",
    category: "Sự kiện & Livestream",
    year: "2024",
    summary:
      "Ghi hình các đêm gala và tiệc tri ân quy mô lớn ngoài trời — bài toán ánh sáng thiếu, sân khấu chuyển cảnh liên tục và yêu cầu ảnh đẹp ngay trong đêm.",
    scope: ["Ekip đa máy ban đêm", "Ảnh phóng sự tiệc", "Recap video", "Ghi hình sân khấu"],
    cover: "/images/work/gala-01.webp",
    gallery: ["/images/work/gala-01.webp", "/images/work/gala-02.webp"],
    span: "wide",
  },
  {
    slug: "futaland-timesquare-noi-that",
    title: "Bộ ảnh nội thất căn hộ mẫu dự án Timesquare",
    client: "Futa Land — Dự án Timesquare",
    category: "Nhiếp ảnh thương mại",
    year: "2025",
    summary:
      "Ghi lại trọn vẹn không gian sống của căn hộ mẫu cao cấp: từ phòng khách, bếp, phòng ăn cho tới từng phòng ngủ — tận dụng ánh sáng tự nhiên và view thành phố để tôn lên chất liệu, màu sắc và độ hoàn thiện nội thất. Bộ ảnh phục vụ trực tiếp cho việc giới thiệu căn hộ mẫu tới khách hàng tiềm năng của dự án.",
    scope: [
      "Chụp ảnh nội thất toàn bộ không gian sống",
      "Set sáng chuyên nghiệp cho từng phòng",
      "Canh góc kiến trúc & chiều sâu không gian",
      "Hậu kỳ màu chuẩn thương mại bất động sản",
    ],
    cover: "/images/work/timesquare-01.webp",
    gallery: [
      "/images/work/timesquare-01.webp",
      "/images/work/timesquare-02.webp",
      "/images/work/timesquare-03.webp",
      "/images/work/timesquare-04.webp",
    ],
    span: "wide",
  },
  {
    slug: "le-frachie-organic-giai-phap-truyen-thong",
    title: "Xây dựng hệ thống truyền thông từ A-Z cho nhà phân phối Organic",
    client: "Le Frachie Organic — Tổng Đại Lý Phân Phối Việt Nam",
    category: "Giải pháp truyền thông",
    year: "2026",
    location: "Đà Nẵng",
    summary:
      "Đồng hành toàn diện cùng Le Frachie Organic từ những ngày đầu: xây dựng bộ nhận diện hình ảnh sản phẩm, vận hành fanpage và sản xuất nội dung đều đặn mỗi tuần — kết hợp hình ảnh dựng bằng AI để rút ngắn thời gian sản xuất mà vẫn giữ chất lượng cao cấp. Từ một fanpage mới, thương hiệu đã có hơn 5.000 người theo dõi cùng hệ thống nội dung tuyển đại lý, minigame tương tác và chăm sóc khách hàng chạy liên tục.",
    scope: [
      "Chiến lược nội dung & định vị thương hiệu",
      "Thiết kế hình ảnh sản phẩm ứng dụng AI",
      "Quản trị fanpage & sản xuất nội dung hằng tuần",
      "Chiến dịch tương tác & minigame thu hút khách hàng",
      "Nội dung tuyển đại lý, cộng tác viên toàn quốc",
    ],
    cover: "/images/work/lefrachie-01.webp",
    gallery: [
      "/images/work/lefrachie-01.webp",
      "/images/work/lefrachie-03.webp",
      "/images/work/lefrachie-02.webp",
    ],
    span: "wide",
  },
  {
    slug: "tabalo-glamping-brand-film",
    title: "Bộ ảnh & phim thương hiệu cho Tabalo Glamping",
    client: "Tabalo Glamping",
    category: "Brand Film",
    year: "2026",
    summary:
      "Tabalo không chỉ bán bàn ghế dã ngoại — họ bán một phong cách sống: sang trọng nhưng gần gũi thiên nhiên, đủ ấm cúng để một gia đình muốn xách balo lên và đi ngay. Chúng tôi tái hiện đúng tinh thần đó trong từng khung hình: từ chi tiết chất liệu gỗ, vải bố trên từng sản phẩm, cho tới khoảnh khắc thật của một gia đình cùng nhau cắm trại bên sông, dưới chân núi.",
    scope: [
      "Concept & chỉ đạo hình ảnh thương hiệu",
      "Sản xuất bộ ảnh lifestyle ngoại cảnh",
      "Sản xuất phim quảng bá thương hiệu",
      "Casting & dàn dựng bối cảnh gia đình",
      "Hậu kỳ màu phong cách cao cấp, ấm áp",
    ],
    cover: "/images/work/tabalo-01.webp",
    gallery: [
      "/images/work/tabalo-01.webp",
      "/images/work/tabalo-02.webp",
      "/images/work/tabalo-03.webp",
      "/images/work/tabalo-04.webp",
      "/images/work/tabalo-05.webp",
    ],
    span: "wide",
  },
  {
    slug: "an-lac-tam-thiet-ke-menu",
    title: "Thiết kế menu nhà hàng chay An Lạc Tâm",
    client: "An Lạc Tâm",
    category: "Thiết kế ấn phẩm",
    year: "2026",
    location: "Đà Nẵng",
    summary:
      "Thiết kế trọn bộ menu cho nhà hàng chay An Lạc Tâm — tinh hoa ẩm thực Việt. Bố cục kết hợp hình ảnh món ăn thực tế với hoạ tiết sen và tông màu đỏ đô, vàng đồng gợi không gian ấm cúng, tĩnh tại đúng tinh thần ẩm thực chay Việt Nam.",
    scope: [
      "Định hướng bố cục & hệ chữ cho toàn bộ menu",
      "Styling và ghép ảnh món ăn theo từng danh mục",
      "Thiết kế trang bìa & hoạ tiết trang trí xuyên suốt",
      "Chuẩn bị file in ấn hoàn chỉnh",
    ],
    cover: "/images/work/menu-anlactam-01.webp",
    gallery: [
      "/images/work/menu-anlactam-01.webp",
      "/images/work/menu-anlactam-02.webp",
      "/images/work/menu-anlactam-03.webp",
      "/images/work/menu-anlactam-04.webp",
      "/images/work/menu-anlactam-05.webp",
      "/images/work/menu-anlactam-06.webp",
      "/images/work/menu-anlactam-07.webp",
    ],
    span: "tall",
  },
  {
    slug: "dana-tram-huong",
    title: "Câu chuyện thương hiệu Dana Trầm Hương",
    client: "Dana Trầm Hương",
    category: "Nhiếp ảnh thương mại",
    year: "2026",
    location: "Đà Nẵng",
    summary:
      "Bộ ảnh phong cách phim tài liệu cho thương hiệu trầm hương Đà Nẵng: từ khoảnh khắc người thợ chế tác, cân đo nguyên liệu trầm thô cho tới hình ảnh trang phục mang nhận diện thương hiệu — giữ đúng chất mộc, trầm tĩnh của một nghề thủ công lâu đời.",
    scope: [
      "Chỉ đạo hình ảnh phong cách tài liệu",
      "Ghi hình quy trình chế tác trầm hương",
      "Ảnh sản phẩm & nhận diện thương hiệu",
      "Hậu kỳ màu phim, giữ chất mộc nguyên liệu",
    ],
    cover: "/images/work/dana-tramhuong-10.webp",
    gallery: [
      "/images/work/dana-tramhuong-10.webp",
      "/images/work/dana-tramhuong-01.webp",
      "/images/work/dana-tramhuong-06.webp",
      "/images/work/dana-tramhuong-09.webp",
      "/images/work/dana-tramhuong-11.webp",
      "/images/work/dana-tramhuong-03.webp",
      "/images/work/dana-tramhuong-05.webp",
      "/images/work/dana-tramhuong-07.webp",
    ],
    span: "wide",
  },
  {
    slug: "zoseo-viet-nam-short-video",
    title: "Quay short video sản phẩm giày thể thao",
    client: "Zoseo Việt Nam",
    category: "TVC & Phim quảng cáo",
    year: "2026",
    location: "Đà Nẵng",
    summary:
      "Sản xuất bộ short video và ảnh sản phẩm cho thương hiệu giày thể thao Zoseo Việt Nam: người mẫu trình diễn tại các bối cảnh ngoài trời ở Đà Nẵng, cận cảnh chất liệu và công nghệ đế giày, đúng nhịp nội dung ngắn cho mạng xã hội.",
    scope: [
      "Casting & đạo diễn hình ảnh",
      "Quay short video đa bối cảnh",
      "Ảnh sản phẩm & cận cảnh chi tiết",
      "Dựng bản ngắn cho mạng xã hội",
    ],
    cover: "/images/work/zoseo-vietnam-01.webp",
    gallery: [
      "/images/work/zoseo-vietnam-01.webp",
      "/images/work/zoseo-vietnam-04.webp",
      "/images/work/zoseo-vietnam-02.webp",
      "/images/work/zoseo-vietnam-03.webp",
      "/images/work/zoseo-vietnam-06.webp",
      "/images/work/zoseo-vietnam-05.webp",
      "/images/work/zoseo-vietnam-07.webp",
    ],
    span: "tall",
  },
];

export const projectCategories: ProjectCategory[] = [
  "Giải pháp truyền thông",
  "TVC & Phim quảng cáo",
  "Sự kiện & Livestream",
  "Fashion Film",
  "Nhiếp ảnh thương mại",
  "Brand Film",
  "Thiết kế ấn phẩm",
];

/**
 * Thứ tự cố định cho lưới trang chủ — dự án đầu tiên chiếm ô lớn nên
 * cần ảnh sạch chữ để lớp tiêu đề đè lên vẫn đọc được.
 */
const featuredOrder = [
  "le-frachie-organic-giai-phap-truyen-thong",
  "futaland-timesquare-noi-that",
  "tabalo-glamping-brand-film",
  "aia-duong-dua-bung-thinh-vuong",
  "ao-dai-yen-fashion-film",
  "le-gia-brand-food",
];

export const featuredProjects = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));
