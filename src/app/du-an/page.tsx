import type { Metadata } from "next";
import { Container, SectionHead } from "@/components/ui";
import { CtaBlock, PageHero } from "@/components/blocks";
import WorkGallery from "@/components/work-gallery";
import StatBand from "@/components/stat-band";

export const metadata: Metadata = {
  title: "Dự án tiêu biểu",
  description:
    "Tuyển tập dự án Diary Agency đã thực hiện: TVC Panasonic, fashion film Áo Dài Yên, giải chạy AIA, Danang Guitar Festival, nhiếp ảnh thương mại Lê Gia và Agreco Coffee.",
  alternates: { canonical: "/du-an/" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Selected Work"
        title={
          <>
            Dự
            <br />
            Án
          </>
        }
        kicker="Thương hiệu thật, kết quả thật."
        lead="Một lát cắt từ hơn 1.000 dự án đã triển khai trong bốn năm qua — cho thấy cách chiến lược và hình ảnh gặp nhau để tạo ra thứ khách hàng thực sự cần."
        gradient="grad-dusk"
        image="/images/work/aia-02.webp"
        imageAlt=""
      />

      <Container className="mt-20 sm:mt-28">
        <SectionHead
          label="Tuyển tập"
          title={
            <>
              Bộ sưu tập nhận diện,
              <br />
              hình ảnh và hệ thống
              <br />
              được xây cho hiệu quả
            </>
          }
          lead="Chọn một hạng mục để lọc, hoặc bấm vào bất kỳ dự án nào để xem chi tiết phạm vi công việc và thư viện hình ảnh."
          group="workhead"
        />

        {/* Không bọc data-reveal ở đây: lưới chứa lightbox `position: fixed`,
            mà phần tử cha có transform sẽ neo nhầm khung định vị. */}
        <div className="mt-14">
          <WorkGallery />
        </div>
      </Container>

      <Container className="mt-24 sm:mt-32">
        <div data-reveal>
          <StatBand />
        </div>
      </Container>

      <CtaBlock
        label="Dự án tiếp theo"
        title={
          <>
            Thương hiệu của bạn
            <br />
            xứng đáng có mặt ở đây
          </>
        }
        lead="Kể cho chúng tôi nghe điều bạn đang muốn xây. Buổi trao đổi đầu tiên luôn miễn phí và không ràng buộc."
      />
    </>
  );
}
