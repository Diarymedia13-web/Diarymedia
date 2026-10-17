/*
 * Đẩy lead từ form trên website sang Hostinger Reach (email marketing).
 *
 * Website là bản xuất tĩnh (không có server), nên KHÔNG được gọi thẳng API
 * Reach từ trình duyệt: mã API sẽ lộ cho bất kỳ ai xem mã nguồn trang.
 * Thay vào đó, trình duyệt gửi lead sang Cloudflare Worker (cùng worker với
 * trợ lý chat, route `/reach-lead`). Worker giữ mã API Reach dưới dạng secret
 * và gọi Reach thay cho trình duyệt. Xem `worker/src/index.ts`.
 *
 * Không có email thì bỏ qua: Reach chỉ gửi được thư khi có địa chỉ email.
 * Lỗi ở bước này không bao giờ chặn khách: lead vẫn đã về mail qua Web3Forms.
 */

const WORKER_URL = process.env.NEXT_PUBLIC_CHAT_WORKER_URL ?? "";

export interface ReachLead {
  email?: string;
  name?: string;
  phone?: string;
  /** Nhóm nhu cầu (id), dùng để gắn tag trong Reach. VD: "nha-san-xuat", "lien-he". */
  group: string;
  /** Ghi chú ngắn hiển thị trong Reach (tối đa 75 ký tự). */
  note?: string;
}

/** Gửi lead sang Reach. Luôn resolve, tối đa ~1,5 giây, không bao giờ throw. */
export function sendLeadToReach(lead: ReachLead): Promise<void> {
  const email = lead.email?.trim();
  if (!WORKER_URL || !email) return Promise.resolve();

  let url: string;
  try {
    url = new URL("/reach-lead", WORKER_URL).toString();
  } catch {
    return Promise.resolve();
  }

  const request = fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, email }),
    // Vẫn gửi tiếp nếu trang chuyển sang /thank-you/ ngay sau đó.
    keepalive: true,
  }).then(
    () => undefined,
    () => undefined,
  );

  const timeout = new Promise<void>((resolve) => setTimeout(resolve, 1500));
  return Promise.race([request, timeout]);
}
