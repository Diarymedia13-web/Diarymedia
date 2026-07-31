/**
 * NGUỒN SỰ THẬT DUY NHẤT cho mọi thông tin doanh nghiệp hiển thị trên website.
 * Muốn đổi hotline, email, fanpage, địa chỉ hay số liệu năng lực → chỉ sửa file này.
 */

export const site = {
  name: "Diary Agency",
  legalId: "4001291895",
  tagline: "Kiến tạo nội dung, kết nối thành công",
  description:
    "Diary Agency là đối tác giải pháp truyền thông toàn diện cho doanh nghiệp: chiến lược truyền thông, chiến lược kinh doanh, thúc đẩy chuyển đổi số, thiết kế website, quảng cáo đa nền tảng, sản xuất hình ảnh và ứng dụng trí tuệ nhân tạo.",
  // Đổi thành tên miền thật sau khi trỏ domain trên Hostinger.
  url: "https://diaryagency.vn",
  locale: "vi_VN",

  contact: {
    phone: "0948801108",
    phoneDisplay: "0948 801 108",
    phoneIntl: "+84948801108",
    email: "Diarymedia13@gmail.com",
    facebook: "https://facebook.com/diarymedia13",
    facebookLabel: "facebook.com/diarymedia13",
    zalo: "https://zalo.me/0948801108",
    messenger: "https://m.me/diarymedia13",
    address: "Đà Nẵng, Việt Nam",
    workingHours: "Thứ 2 – Thứ 7 · 08:00 – 18:00",
  },

  stats: [
    { value: 4, prefix: "", suffix: "+", label: "Năm kinh nghiệm", sub: "trong ngành truyền thông" },
    { value: 2000, prefix: "", suffix: "+", label: "Khách hàng", sub: "đã tin tưởng đồng hành" },
    { value: 1000, prefix: "", suffix: "+", label: "Dự án", sub: "triển khai thành công" },
    { value: 48, prefix: "12–", suffix: "h", label: "Bàn giao", sub: "cam kết tiến độ sản phẩm" },
  ],

  values: [
    {
      no: "01",
      title: "Tốc độ vượt trội",
      body: "Cam kết hoàn thiện sản phẩm trong 12 – 48 giờ, giúp doanh nghiệp bắt kịp nhịp chiến dịch thay vì chờ đợi quy trình.",
    },
    {
      no: "02",
      title: "Sáng tạo không ngừng",
      body: "Luôn đổi mới trong cách kể chuyện, cách dựng hình và phong cách truyền tải để tạo ra sản phẩm mang dấu ấn riêng.",
    },
    {
      no: "03",
      title: "Chất lượng đảm bảo",
      body: "Mỗi sản phẩm đều được trau chuốt tỉ mỉ: hình ảnh sắc nét, nội dung chuyên sâu, bám sát chiến lược thương hiệu.",
    },
  ],

  clients: [
    "Panasonic",
    "AIA",
    "Lê Gia Brand",
    "Agreco Coffee",
    "Tập đoàn Á Châu",
    "Danang Guitar Festival",
    "Bệnh viện Ung Bướu",
    "Diễn đàn BĐS Quốc gia",
    "Brand Walkers",
    "LovePop",
    "Toả Sáng Thiên Thần Nhí",
    "Miền Ký Ức",
  ],

  founder: {
    name: "Nguyễn Hồ Thanh Pháp",
    shortName: "Pháp Nguyễn",
    role: "Founder & Creative Director",
    photo: "/images/founder-phap-nguyen.webp",
    quote:
      "Truyền thông không chỉ là kể chuyện, mà là nghệ thuật chạm đến cảm xúc và tạo ra giá trị thật cho thương hiệu.",
    bio: [
      "Là người sáng lập Diary Agency, Nguyễn Hồ Thanh Pháp mang trong mình tầm nhìn sâu rộng về ngành truyền thông và sáng tạo nội dung. Với kinh nghiệm dày dặn cùng khả năng định hướng chiến lược, anh không chỉ tạo ra những sản phẩm chất lượng mà còn xây dựng một đội ngũ vững mạnh, luôn sẵn sàng đổi mới và bứt phá.",
      "Sau hơn bốn năm đứng sau hàng nghìn dự án sản xuất, anh nhận ra điều doanh nghiệp Việt Nam thiếu không phải là một video đẹp — mà là một hệ thống truyền thông chạy được: từ chiến lược, nội dung, kênh phân phối cho tới đo lường hiệu quả kinh doanh.",
      "Đó là lý do Diary Agency hôm nay không dừng ở vai trò nhà sản xuất, mà trở thành đối tác giải pháp truyền thông toàn diện — nơi chiến lược, công nghệ và trí tuệ nhân tạo được đưa vào cùng một quy trình với máy quay và ánh sáng.",
    ],
  },
} as const;

export type Site = typeof site;
