import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "넷북몰",
  description: "넷북몰에 오신 것을 환영합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

