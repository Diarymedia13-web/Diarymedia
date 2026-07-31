import { Container, ButtonLink, SectionLabel } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col justify-center py-32">
      <SectionLabel className="mb-6">Lỗi 404</SectionLabel>
      <h1 className="t-display max-w-2xl">
        Trang bạn tìm
        <br />
        không tồn tại
      </h1>
      <p className="t-lead mt-6 max-w-md">
        Có thể đường dẫn đã thay đổi hoặc bạn gõ nhầm địa chỉ. Quay lại trang chủ để tiếp tục khám
        phá Diary Agency.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="solid">
          Về trang chủ
        </ButtonLink>
        <ButtonLink href="/lien-he/" variant="outline">
          Liên hệ với chúng tôi
        </ButtonLink>
      </div>
    </Container>
  );
}
