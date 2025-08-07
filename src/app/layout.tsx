import type { Metadata } from "next";
import "./globals.css";
import "react-calendar/dist/Calendar.css";
import { Suspense } from "react";
import { CombinedProviders } from "@/store/providers";

export const metadata: Metadata = {
  title: "EduSphere | Where Learning Meets Efficiency",
  description:
    "A school management system dashboard designed to simplify administration, enhance communication, and bring education closer to students, teachers, and parents.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  icons: [{ rel: "icon", url: "icons/mag.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <CombinedProviders>{children}</CombinedProviders>
        </Suspense>
      </body>
    </html>
  );
}
