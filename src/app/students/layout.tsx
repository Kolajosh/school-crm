import { DashboardLayout } from "@/components";
import { ReactNode } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
