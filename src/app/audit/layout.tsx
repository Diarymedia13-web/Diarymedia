import type { ReactNode } from "react";
import AuditAnalytics from "@/components/audit-analytics";

export default function AuditLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuditAnalytics />
      {children}
    </>
  );
}
