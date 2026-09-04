import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YUJI VINA - Giải pháp máy móc tự động hóa & cơ khí chính xác",
    template: "%s | YUJI VINA"
  },
  description: "Giải pháp hàng đầu về máy móc tự động hóa và thiết bị cơ khí chính xác tại Việt Nam.",
  openGraph: {
    title: "YUJI VINA - Giải pháp máy móc tự động hóa & cơ khí chính xác",
    description: "Giải pháp hàng đầu về máy móc tự động hóa và thiết bị cơ khí chính xác tại Việt Nam.",
    type: "website",
    locale: "vi_VN",
    siteName: "YUJI VINA",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "YUJI VINA Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YUJI VINA - Giải pháp máy móc tự động hóa & cơ khí chính xác",
    description: "Giải pháp hàng đầu về máy móc tự động hóa và thiết bị cơ khí chính xác tại Việt Nam.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
