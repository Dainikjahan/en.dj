import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dainik Jahan English",
  description: "Independent English news publication by Dainik Jahan.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://en.dainikjahan.com"),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
