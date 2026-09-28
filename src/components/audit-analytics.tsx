import Script from "next/script";

/**
 * Nạp GA4 / Google Tag Manager / Meta Pixel cho riêng landing page /audit —
 * CHỈ nạp khi biến môi trường tương ứng đã được điền (xem .env.example).
 * Không tự đặt ID giả: thiếu biến nào thì bỏ qua hẳn script đó, không lỗi.
 *
 * Đặt trong `src/app/audit/layout.tsx`, không đặt ở layout gốc — landing
 * chiến dịch cần đo riêng, không lẫn với lưu lượng của toàn bộ website.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export default function AuditAnalytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="audit-ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {GTM_ID && (
        <Script id="audit-gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}

      {META_PIXEL_ID && (
        <Script id="audit-meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');fbq('track', 'PageView');`}
        </Script>
      )}

      {/* OpenAI Ads Pixel — pixel ID thật do sếp cung cấp, KHÔNG dùng biến
          môi trường và KHÔNG sửa nội dung snippet theo đúng yêu cầu, vì đây
          là mã chính thức đã cấu hình sẵn "Lead Created" trong Ads Manager.
          Đã xác minh: bzrcdn.openai.com có chứng chỉ TLS hợp lệ đứng tên
          chính domain này và nội dung SDK khớp với công cụ đo lường quảng
          cáo thật. Sự kiện "lead_created" được bắn riêng trong audit-form.tsx
          — CHỈ sau khi Web3Forms xác nhận gửi thành công, không bắn khi mới
          mở trang, bấm nút, hay gửi lỗi. */}
      <Script id="audit-openai-ads-pixel" strategy="afterInteractive">
        {`!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"XLizin1Gr99iwKZd9tt61w",debug:true});`}
      </Script>
    </>
  );
}
