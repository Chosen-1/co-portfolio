import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CO Portfolio Builder",
  description:
    "Create a professional digital portfolio for Clinical Officers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}