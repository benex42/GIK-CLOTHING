import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIK Clothings | Formalwear, Defined",
  description: "Refined tailoring and occasion wear by GIK Clothings.",
  icons: { icon: "/gik-clothings-logo.jpg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
